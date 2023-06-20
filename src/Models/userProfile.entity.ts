import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';

@Table({
    tableName: 'UserProfile'
})
@ObjectType()
export class UserProfile extends Model {
    @Field(type => String)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true
    }) userId: string;

    @Field(type => String)
    @Column({
        type: DataType.STRING,
        autoIncrement: true,
        unique: true
    }) profileId: number;

    @Field(type => String)
    @Column({
        type: DataType.STRING,
        allowNull: false
    }) firstName: string;

    @Field(type => String)
    @Column({
        type: DataType.STRING,
        allowNull: false
    }) lastName: string;

    @Field(type => String)
    @Column({
        type: DataType.STRING,
        allowNull: false
    }) disPlayName: string;

    @Field(type => String)
    @Column dateOfBirth: string;

    @Field(type => String)
    @Column picture: string;

    @Field(type => String)
    @Column gender: string;

    @Field(type => String)
    @Column phoneNumber: string;

    @Field(type => String)
    @Column preferredLanguage: string;

    @Field(type => String)
    @Column preferredCurrency: string;

    @Field(type => String)
    @Column verificationCode: string;

    @Field(type => String)
    @Column countryCode: string;

    @Field(type => String)
    @Column countryName: string;

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;
}