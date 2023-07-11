import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../Models/user.entity';

const configService = new ConfigService();
const jwtService = new JwtService();

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY') private userModel: typeof User,
    ) { }

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

    async userLogin(email: string, password: string) {
        const userData = await this.userModel.findOne({
            where: { email },
            raw: true
        });

        if (!userData) {
            return {
                status: 400,
                errorMessage: 'Oops! user does not exist'
            }
        } else if (bcrypt.compareSync(password, userData.password)) {
            return {
                status: 400,
                errorMessage: 'Oops! Password is incorrect'
            }
        } else {
            const tokens = await this.getTokens(userData.id, userData.email);
            await this.updateTokens(userData.id, tokens.refreshToken);
            return {
                result: userData,
                token: tokens.refreshToken,
                status: 200,
                errorMessage: ''
            }
        }
    }
}