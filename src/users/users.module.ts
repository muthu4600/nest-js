import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';


@Module({
    imports: [],
    providers: [UsersService, UsersResolver, ...usersProviders]
})
export class UserModule { }