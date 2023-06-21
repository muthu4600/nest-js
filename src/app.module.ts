import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { AppService } from './app.service';
import { BooksService } from './books/books.service';
import { UsersService } from './users/users.service';
import { AppController } from './app.controller';
import { BooksResolver } from './books/books.resolver';
import { UsersResolver } from './users/users.resolver';
import { User } from './Models/user.entity';
import { UserProfile } from './Models/userProfile.entity';

const configService = new ConfigService();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: configService.get('DIALECT'),
      host: configService.get('DB_HOST'),
      port: configService.get('PORT'),
      username: configService.get('DB_USER_NAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      models: [User, UserProfile],
    }),
    SequelizeModule.forFeature([User, UserProfile],),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: (join(process.cwd(), 'src/schema.gql')),
      playground: true
    })
  ],
  controllers: [AppController],
  providers: [AppService, BooksService, BooksResolver, UsersService, UsersResolver],
})

export class AppModule { }
