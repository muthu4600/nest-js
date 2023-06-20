import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserDetails {
    @Field(type => String, { nullable: true }) id: string;
    @Field(type => String, { nullable: true }) email: string;
    @Field(type => String, { nullable: true }) password: string;
    @Field(type => String, { nullable: true }) firstName: string;
    @Field(type => String, { nullable: true }) lastName: string;
    @Field(type => String, { nullable: true }) dateOfBirth: string;
    @Field(type => String, { nullable: true }) gender: string;
    @Field(type => String, { nullable: true }) phoneNumber: string;
    @Field(type => String, { nullable: true }) countryCode: string;
    @Field(type => String, { nullable: true }) countryName: string;
    @Field(type => String, { nullable: true }) picture: string;
    @Field(type => String, { nullable: true }) preferredLanguage: string;
    @Field(type => String, { nullable: true }) preferredCurrency: string;
    @Field({ nullable: true }) isActive: boolean;
}