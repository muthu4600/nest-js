import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { User } from '../Models/user.entity';
import { UserProfile } from 'src/Models/userProfile.entity';
import { UserDetails } from './users.input';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(UserProfile) private UserProfileModel: typeof UserProfile,
    ) { }

    async getAllUsers() {
        return await this.userModel.findAll({
            include: [{ model: this.UserProfileModel, as: 'profile' }]
        });
    }

    async getUser(id: string) {
        return await this.userModel.findOne({
            where: {
                id,
            },
            include: [{ model: this.UserProfileModel, as: 'profile' }]
        });
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
            const salt = await bcrypt.genSalt();
            userDetails.password = await bcrypt.hash(userDetails.password, salt);
            return await this.userModel.create(
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
        }
    }

    async delete(id: number) {
        await this.userModel.destroy({ where: { id } });
        return await this.userModel.findAll({ raw: true });
    }
}