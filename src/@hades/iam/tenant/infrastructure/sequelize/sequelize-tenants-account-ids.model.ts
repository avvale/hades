import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { Model } from '@hades//infrastructure/sequelize/sequelize-.model';

@Table({ modelName: '', freezeTableName: true, timestamps: false })
export class IamTenantsModel extends Model<IamTenantsModel> 
{
    @ForeignKey(() => IamTenantModel)
    @Column({
        field: 'tenant_id',
        type: DataTypes.UUID,
    })
    tenantId: string;

    @ForeignKey(() => Model)
    @Column({
        field: '_id',
        type: DataTypes.UUID,
    })
    Id: string;
}