import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';
import { CciExecutionModel } from '@hades/cci/execution/infrastructure/sequelize/sequelize-execution.model';

@Table({ modelName: 'CciChannelDetail', freezeTableName: true, timestamps: false })
export class CciChannelDetailModel extends Model<CciChannelDetailModel>
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
        type: DataTypes.ENUM('ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED'),
    })
    status: string;

    @Index
    @Column({
        field: 'channelHash',
        allowNull: false,
        type: DataTypes.CHAR(40),
    })
    channelHash: string;

    @Column({
        field: 'channelSapId',
        allowNull: false,
        type: DataTypes.STRING(50),
    })
    channelSapId: string;

    @Column({
        field: 'channelParty',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    channelParty: string;

    @Column({
        field: 'channelComponent',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    channelComponent: string;

    @Column({
        field: 'channelName',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    channelName: string;

    @Column({
        field: 'detail',
        allowNull: true,
        type: DataTypes.TEXT,
    })
    detail: string;

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