import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserProfile } from './userProfile.entity';

@Table({
    tableName: 'User'
})
@ObjectType()
export class User extends Model {

    @Field(type => String)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        defaultValue: DataType.UUIDV1
    })
    id: string;

    @Field(type => String)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Field(type => String)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

    @Field(type => String)
    @Column({ defaultValue: true })
    isActive: boolean;

    @Field(type => String)
    @Column
    createdAt: Date;

    @Field(type => String)
    @Column
    updatedAt: Date;

    @Field(returns => UserProfile)
    @HasOne(() => UserProfile, {
        foreignKey: 'userId',
        as: 'profile'
    }) profile: UserProfile;
}