import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserProfile } from './userProfile.entity';

@Table({
    tableName: 'User'
})
@ObjectType()
export class User extends Model {

    @Field(type => String, { nullable: true })
    @Column({
        type: DataType.UUID,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        defaultValue: DataType.UUIDV1
    })
    id: string;

    @Field(type => String, { nullable: true })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Field(type => String, { nullable: true })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

    @Field(type => String, { nullable: true })
    @Column({ defaultValue: true })
    isActive: boolean;

    @Field(type => String, { nullable: true })
    @Column
    createdAt: Date;

    @Field(type => String, { nullable: true })
    @Column
    updatedAt: Date;

    @Field(type => String, { nullable: true })
    @Column
    refreshToken: string;

    @Field(returns => UserProfile, { nullable: true })
    @HasOne(() => UserProfile, {
        foreignKey: 'userId',
        as: 'profile'
    }) profile: UserProfile;
}