import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { User } from '../Models/user.model';
import { UserDetails } from './users.input';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async getAllUsers() {
        return await this.userModel.findAll({ raw: true });
    }

    async getUser(id: number) {
        return await this.userModel.findOne({
            where: {
                id,
            },
            raw: true
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
            return await this.userModel.create({ ...userDetails });
        }

    }

    async delete(id: number) {
        await this.userModel.destroy({ where: { id } });
        return await this.userModel.findAll({ raw: true });
    }
}