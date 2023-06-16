import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Books {
    @Field(type => Int)
    id: number;
    @Field()
    title: string;
    @Field()
    author: string;
    @Field()
    description: string;
}