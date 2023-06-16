import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Users {
    @Field(type => Int)
    id: number;
    @Field(type => String)
    firstName: string;
    @Field(type => String)
    lastName: string;
    @Field(type => String)
    email: string;
    @Field(type => String)
    password: string;
    @Field()
    isActive: boolean;
}