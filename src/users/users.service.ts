import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from '../Models/user.entity';
import { UserProfile } from 'src/Models/userProfile.entity';
import { UserDetails } from './users.input';
import validation from 'src/helpers/validation';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

const configService = new ConfigService();
const jwtService = new JwtService();

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY') private userModel: typeof User,
        @Inject('USER_PROFILE_REPOSITORY') private UserProfileModel: typeof UserProfile,
    ) { }

    async getAllUsers() {
        const userData = await this.userModel.findAll({
            include: [{ model: this.UserProfileModel, as: 'profile' }]
        });

        return {
            results: userData,
            status: 200,
            errorMessage: ''
        }
    }

    async getUser(id: string) {
        const { status, errorMessage } = validation(id);
        if (status !== 200) {
            return {
                result: [],
                status,
                errorMessage
            }
        }
        const userData = await this.userModel.findOne({
            where: {
                id
            },
            include: [{ model: this.UserProfileModel, as: 'profile' }]
        });
        return {
            result: userData,
            status: 200,
            errorMessage: ''
        }
    }

    async addUpdateUser(userDetails: UserDetails) {
        if (userDetails.id) {
            await this.userModel.update(userDetails, { where: { id: userDetails.id } });
            return await this.userModel.findOne({
                where: {
                    id: userDetails.id
                },
                raw: true
            });
        } else {

            const userExists = await this.userModel.findOne({
                where: { email: userDetails.email }
            });
            if (userExists) throw new BadRequestException('User already exists');

            const salt = await bcrypt.genSalt();
            userDetails.password = await bcrypt.hash(userDetails.password, salt);
            const userData = await this.userModel.create(
                {
                    email: userDetails.email,
                    password: userDetails.password,
                    profile: {
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        disPlayName: userDetails.firstName + ' ' + userDetails.lastName
                    }
                },
                {
                    include: [
                        { model: this.UserProfileModel, as: "profile" },
                    ],
                }
            );
            const tokens = await this.getTokens(userData.id, userData.email);
            await this.updateTokens(userData.id, tokens.refreshToken);

            return {
                result: userData,
                token: tokens.refreshToken,
                status: 200,
                errorMessage: ''
            };
        }
    }

    async delete(id: string) {
        await this.userModel.destroy({ where: { id } });
        return {
            status: 200,
            errorMessage: ''
        };
    }

    async getTokens(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: configService.get<string>('JWT_SECRET'),
                    expiresIn: '15m',
                },
            ),
            jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: configService.get<string>('JWT_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async updateTokens(id: string, refreshToken: string) {
        await this.userModel.update(
            { refreshToken }, {
            where: { id }
        });
    }
}