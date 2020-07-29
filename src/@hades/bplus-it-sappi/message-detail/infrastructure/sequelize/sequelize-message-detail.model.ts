import { Column, Model, Table, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';
import { BplusItSappiExecutionModel } from '@hades/bplus-it-sappi/execution/infrastructure/sequelize/sequelize-execution.model';

@Table({ modelName: 'bplus_it_sappi_message_detail', freezeTableName: true })
export class BplusItSappiMessageDetailModel extends Model<BplusItSappiMessageDetailModel> 
{ 
        
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
    })
    id: string;
        
             
        
    
    @Column({
        field: 'tenant_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {
            model: AdminTenantModel,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    tenantId: string;
        
    
    @BelongsTo(() => AdminTenantModel)
    tenant: AdminTenantModel;
             
        
    
    @Column({
        field: 'tenant_code',
        
        allowNull: false,
        type: DataTypes.STRING(50),
        
    })
    tenantCode: string;
        
             
        
    
    @Column({
        field: 'system_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {
            model: BplusItSappiSystemModel,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    systemId: string;
        
    
    @BelongsTo(() => BplusItSappiSystemModel)
    system: BplusItSappiSystemModel;
             
        
    
    @Column({
        field: 'system_name',
        
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
        
             
        
    
    @Column({
        field: 'execution_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {
            model: BplusItSappiExecutionModel,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    executionId: string;
        
    
    @BelongsTo(() => BplusItSappiExecutionModel)
    execution: BplusItSappiExecutionModel;
             
        
    
    @Column({
        field: 'execution_type',
        
        allowNull: false,
        type: DataTypes.ENUM('SUMMARY','DETAIL'),
        
    })
    executionType: string;
        
             
        
    
    @Column({
        field: 'execution_executed_at',
        
        allowNull: false,
        type: DataTypes.DATE,
        
    })
    executionExecutedAt: string;
        
             
        
    
    @Column({
        field: 'execution_monitoring_start_at',
        
        allowNull: false,
        type: DataTypes.DATE,
        
    })
    executionMonitoringStartAt: string;
        
             
        
    
    @Column({
        field: 'execution_monitoring_end_at',
        
        allowNull: false,
        type: DataTypes.DATE,
        
    })
    executionMonitoringEndAt: string;
        
             
        
    
    @Column({
        field: 'flow_hash',
        
        allowNull: false,
        type: DataTypes.CHAR(40),
        
    })
    flowHash: string;
        
             
        
    
    @Column({
        field: 'flow_party',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    flowParty: string;
        
             
        
    
    @Column({
        field: 'flow_component',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    flowComponent: string;
        
             
        
    
    @Column({
        field: 'flow_interface_name',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    flowInterfaceName: string;
        
             
        
    
    @Column({
        field: 'flow_interface_namespace',
        
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
        field: 'start_time_at',
        
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
        field: 'error_category',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    errorCategory: string;
        
             
        
    
    @Column({
        field: 'error_code',
        
        allowNull: true,
        type: DataTypes.STRING(50),
        
    })
    errorCode: string;
        
             
        
    
    @Column({
        field: 'error_label',
        
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
        field: 'quality_of_service',
        
        allowNull: true,
        type: DataTypes.STRING(20),
        
    })
    qualityOfService: string;
        
             
        
    
    @Column({
        field: 'receiver_party',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    receiverParty: string;
        
             
        
    
    @Column({
        field: 'receiver_component',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    receiverComponent: string;
        
             
        
    
    @Column({
        field: 'receiver_interface',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    receiverInterface: string;
        
             
        
    
    @Column({
        field: 'receiver_interface_namespace',
        
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
        field: 'times_failed',
        
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
    })
    timesFailed: number;
        
             
        
    
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