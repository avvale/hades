import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';
import { CciExecutionModel } from '@hades/cci/execution/infrastructure/sequelize/sequelize-execution.model';

@Table({ modelName: 'CciMessageDetail', freezeTableName: true, timestamps: false })
export class CciMessageDetailModel extends Model<CciMessageDetailModel>
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
        field: 'scenario',
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    scenario: string;

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

    @Index
    @Column({
        field: 'flowHash',
        allowNull: false,
        type: DataTypes.CHAR(40),
    })
    flowHash: string;

    @Column({
        field: 'flowParty',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    flowParty: string;

    @Column({
        field: 'flowReceiverParty',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    flowReceiverParty: string;

    @Column({
        field: 'flowComponent',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    flowComponent: string;

    @Column({
        field: 'flowReceiverComponent',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    flowReceiverComponent: string;

    @Column({
        field: 'flowInterfaceName',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    flowInterfaceName: string;

    @Column({
        field: 'flowInterfaceNamespace',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    flowInterfaceNamespace: string;

    @Column({
        field: 'status',
        allowNull: false,
        type: DataTypes.ENUM('SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING'),
    })
    status: string;

    @Column({
        field: 'refMessageId',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    refMessageId: string;

    @Column({
        field: 'detail',
        allowNull: true,
        type: DataTypes.TEXT,
    })
    detail: string;

    @Column({
        field: 'example',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    example: string;

    @Column({
        field: 'startTimeAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    startTimeAt: string;

    @Column({
        field: 'direction',
        allowNull: false,
        type: DataTypes.ENUM('INBOUND','OUTBOUND'),
    })
    direction: string;

    @Column({
        field: 'errorCategory',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    errorCategory: string;

    @Column({
        field: 'errorCode',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    errorCode: string;

    @Column({
        field: 'errorLabel',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    errorLabel: number;

    @Column({
        field: 'node',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    node: number;

    @Column({
        field: 'protocol',
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    protocol: string;

    @Column({
        field: 'qualityOfService',
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    qualityOfService: string;

    @Column({
        field: 'receiverParty',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    receiverParty: string;

    @Column({
        field: 'receiverComponent',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    receiverComponent: string;

    @Column({
        field: 'receiverInterface',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    receiverInterface: string;

    @Column({
        field: 'receiverInterfaceNamespace',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    receiverInterfaceNamespace: string;

    @Column({
        field: 'retries',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    retries: number;

    @Column({
        field: 'size',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    size: number;

    @Column({
        field: 'timesFailed',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    timesFailed: number;

    @Column({
        field: 'numberMax',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    numberMax: number;

    @Column({
        field: 'numberDays',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    numberDays: number;

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