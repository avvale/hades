import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { IamAccountModel } from '@hades/iam/account/infrastructure/sequelize/sequelize-account.model';

@Table({ modelName: 'IamTenantsAccounts', freezeTableName: true, timestamps: false })
export class IamTenantsAccountsModel extends Model<IamTenantsAccountsModel>
{
    @ForeignKey(() => IamTenantModel)
    @Column({
        field: 'tenantId',
        type: DataTypes.UUID,
    })
    tenantId: string;

    @ForeignKey(() => IamAccountModel)
    @Column({
        field: 'accountId',
        type: DataTypes.UUID,
    })
    accountId: string;
}