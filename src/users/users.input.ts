import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserDetails {
    @Field(type => Int, { nullable: true })
    id: number;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    email: string;
    @Field(type => String, { nullable: true })
    password: string;
    @Field({ nullable: true })
    isActive: boolean;
}