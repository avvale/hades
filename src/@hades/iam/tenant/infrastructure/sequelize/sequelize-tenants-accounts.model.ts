import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { IamAccountModel } from '@hades/iam/account/infrastructure/sequelize/sequelize-account.model';

@Table({ modelName: 'iam_tenants_accounts', freezeTableName: true, timestamps: false })
export class IamTenantsAccountsModel extends Model<IamTenantsAccountsModel> 
{   
    @ForeignKey(() => IamTenantModel)
    @Column({
        field: 'tenant_id',
        type: DataTypes.UUID,
    })
    tenantId: string;

    @ForeignKey(() => IamAccountModel)
    @Column({
        field: 'account_id',
        type: DataTypes.UUID,
    })
    accountId: string;
}