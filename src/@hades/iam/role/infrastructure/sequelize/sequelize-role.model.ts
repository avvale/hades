import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamPermissionModel } from '@hades/iam/permission/infrastructure/sequelize/sequelize-permission.model';
import { IamPermissionsRolesModel } from '@hades/iam/permission/infrastructure/sequelize/sequelize-permissions-roles.model';
import { IamAccountModel } from '@hades/iam/account/infrastructure/sequelize/sequelize-account.model';
import { IamRolesAccountsModel } from '@hades/iam/role/infrastructure/sequelize/sequelize-roles-accounts.model';

@Table({ modelName: 'iam_role', freezeTableName: true })
export class IamRoleModel extends Model<IamRoleModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'is_master',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isMaster: boolean;


    @BelongsToMany(() => IamPermissionModel, () => IamPermissionsRolesModel)
    permissions: IamPermissionModel[];


    @BelongsToMany(() => IamAccountModel, () => IamRolesAccountsModel)
    accounts: IamAccountModel[];

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