import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/Models/user.entity";

@ObjectType()
export class userType {
    @Field(type => User, { nullable: true })
    result: User;

    @Field(type => [User], { nullable: true })
    results: [User];

    @Field(type => Int)
    status: number;

    @Field(type => String, { nullable: true })
    errorMessage: string;

    @Field(type => String, { nullable: true })
    token: string;
}