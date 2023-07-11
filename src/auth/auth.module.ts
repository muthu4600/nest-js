import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { authProviders } from './auth.providers';
import { AuthResolvers } from './auth.resolvers';
import { AuthService } from './auth.service';

@Module({
    imports: [JwtModule.register({})],
    providers: [JwtService, AuthService, AuthResolvers, ...authProviders],
})
export class AuthModule { }