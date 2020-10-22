import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamAccountModel } from '@hades/iam/account/infrastructure/sequelize/sequelize-account.model';

@Table({ modelName: 'iam_user', freezeTableName: true })
export class IamUserModel extends Model<IamUserModel> 
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => IamAccountModel)
    @Column({
        field: 'account_id',
        allowNull: false,
        type: DataTypes.UUID,
    })
    accountId: string;

    @BelongsTo(() => IamAccountModel)
    account: IamAccountModel;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'surname',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    surname: string;

    @Column({
        field: 'avatar',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    avatar: string;

    @Column({
        field: 'mobile',
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    mobile: string;

    @Column({
        field: 'lang_id',
        allowNull: true,
        type: DataTypes.UUID,
    })
    langId: string;

    @Column({
        field: 'username',
        allowNull: false,
        type: DataTypes.STRING(120),
    })
    username: string;

    @Column({
        field: 'password',
        allowNull: false,
        type: DataTypes.STRING(undefined),
    })
    password: string;

    @Column({
        field: 'remember_token',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    rememberToken: string;

    @Column({
        field: 'data',
        allowNull: true,
        type: DataTypes.JSON,
    })
    data: any;

    @Column({
        field: 'created_at',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updated_at',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deleted_at',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}