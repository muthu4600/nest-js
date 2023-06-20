import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';

import { AppService } from './app.service';
import { BooksService } from './books/books.service';
import { UsersService } from './users/users.service';
import { AppController } from './app.controller';
import { BooksResolver } from './books/books.resolver';
import { UsersResolver } from './users/users.resolver';
import { User } from './Models/user.entity';
import { UserProfile } from './Models/userProfile.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Root123!',
      database: 'nest_training',
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
