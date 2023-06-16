import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    id: number;

    @Column({ allowNull: false })
    firstName: string;

    @Column({ allowNull: false })
    lastName: string;

    @Column({ allowNull: false })
    email: string;

    @Column({ allowNull: false })
    password: string

    @Column({ defaultValue: true })
    isActive: boolean;

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;
}