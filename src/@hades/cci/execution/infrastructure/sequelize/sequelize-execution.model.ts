import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';

@Table({ modelName: 'CciExecution', freezeTableName: true, timestamps: false })
export class CciExecutionModel extends Model<CciExecutionModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => IamTenantModel)
    @Column({
        field: 'tenantId',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    tenantId: string;

    @BelongsTo(() => IamTenantModel)
    tenant: IamTenantModel;

    @Column({
        field: 'tenantCode',
        allowNull: false,
        type: DataTypes.STRING(50),
    })
    tenantCode: string;

    @ForeignKey(() => CciSystemModel)
    @Column({
        field: 'systemId',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    systemId: string;

    @BelongsTo(() => CciSystemModel)
    system: CciSystemModel;

    @Column({
        field: 'systemName',
        allowNull: false,
        type: DataTypes.STRING(20),
    })
    systemName: string;

    @Column({
        field: 'version',
        allowNull: false,
        type: DataTypes.STRING(20),
    })
    version: string;

    @Column({
        field: 'type',
        allowNull: false,
        type: DataTypes.ENUM('SUMMARY','DETAIL'),
    })
    type: string;

    @Column({
        field: 'executedAt',
        allowNull: false,
        type: DataTypes.DATE,
    })
    executedAt: string;

    @Column({
        field: 'monitoringStartAt',
        allowNull: false,
        type: DataTypes.DATE,
    })
    monitoringStartAt: string;

    @Column({
        field: 'monitoringEndAt',
        allowNull: false,
        type: DataTypes.DATE,
    })
    monitoringEndAt: string;

    @Column({
        field: 'createdAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updatedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}