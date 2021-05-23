import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';
import { CciExecutionModel } from '@hades/cci/execution/infrastructure/sequelize/sequelize-execution.model';

@Table({ modelName: 'CciJobDetail', freezeTableName: true, timestamps: false })
export class CciJobDetailModel extends Model<CciJobDetailModel>
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

    @ForeignKey(() => CciExecutionModel)
    @Column({
        field: 'executionId',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    executionId: string;

    @BelongsTo(() => CciExecutionModel)
    execution: CciExecutionModel;

    @Column({
        field: 'executionType',
        allowNull: false,
        type: DataTypes.ENUM('SUMMARY','DETAIL'),
    })
    executionType: string;

    @Column({
        field: 'executionExecutedAt',
        allowNull: false,
        type: DataTypes.DATE,
    })
    executionExecutedAt: string;

    @Column({
        field: 'executionMonitoringStartAt',
        allowNull: false,
        type: DataTypes.DATE,
    })
    executionMonitoringStartAt: string;

    @Column({
        field: 'executionMonitoringEndAt',
        allowNull: false,
        type: DataTypes.DATE,
    })
    executionMonitoringEndAt: string;

    @Column({
        field: 'status',
        allowNull: false,
        type: DataTypes.ENUM('CANCELLED','COMPLETED','ERROR'),
    })
    status: string;

    @Column({
        field: 'name',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'returnCode',
        allowNull: true,
        type: DataTypes.INTEGER,
    })
    returnCode: number;

    @Column({
        field: 'node',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    node: string;

    @Column({
        field: 'user',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    user: string;

    @Column({
        field: 'startAt',
        allowNull: false,
        type: DataTypes.DATE,
    })
    startAt: string;

    @Column({
        field: 'endAt',
        allowNull: false,
        type: DataTypes.DATE,
    })
    endAt: string;

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