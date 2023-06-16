import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class BookDetails {
    @Field(type => Int)
    id: number;
    @Field()
    title: string;
    @Field()
    author: string;
    @Field()
    description: string;
}