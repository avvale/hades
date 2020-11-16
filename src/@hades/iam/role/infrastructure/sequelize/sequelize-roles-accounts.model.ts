import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamRoleModel } from '@hades/iam/role/infrastructure/sequelize/sequelize-role.model';
import { IamAccountModel } from '@hades/iam/account/infrastructure/sequelize/sequelize-account.model';

@Table({ modelName: 'iam_roles_accounts', freezeTableName: true, timestamps: false })
export class IamRolesAccountsModel extends Model<IamRolesAccountsModel> 
{
    @ForeignKey(() => IamRoleModel)
    @Column({
        field: 'role_id',
        type: DataTypes.UUID,
    })
    roleId: string;

    @ForeignKey(() => IamAccountModel)
    @Column({
        field: 'account_id',
        type: DataTypes.UUID,
    })
    accountId: string;
}