import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';
import { BplusItSappiExecutionModel } from '@hades/bplus-it-sappi/execution/infrastructure/sequelize/sequelize-execution.model';
import { BplusItSappiFlowModel } from '@hades/bplus-it-sappi/flow/infrastructure/sequelize/sequelize-flow.model';

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
        
             
        
    @ForeignKey(() => AdminTenantModel)
    
    @Column({
        field: 'tenant_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
    })
    tenantId: string;
        
    
    @BelongsTo(() => AdminTenantModel)
    tenant: AdminTenantModel;
             
        
    @ForeignKey(() => BplusItSappiSystemModel)
    
    @Column({
        field: 'system_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
    })
    systemId: string;
        
    
    @BelongsTo(() => BplusItSappiSystemModel)
    system: BplusItSappiSystemModel;
             
        
    @Column({
        field: 'system_name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(20),
    })
    systemName: string;
        
             
        
    @Column({
        field: 'scenario',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    scenario: string;
        
             
        
    @ForeignKey(() => BplusItSappiExecutionModel)
    
    @Column({
        field: 'execution_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
    })
    executionId: string;
        
    
    @BelongsTo(() => BplusItSappiExecutionModel)
    execution: BplusItSappiExecutionModel;
             
        
    @Column({
        field: 'execution_type',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.ENUM('SUMMARY','DETAIL'),
    })
    executionType: string;
        
             
        
    @Column({
        field: 'execution_executed_at',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.DATE,
    })
    executionExecutedAt: string;
        
             
        
    @Column({
        field: 'execution_monitoring_start_at',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.DATE,
    })
    executionMonitoringStartAt: string;
        
             
        
    @Column({
        field: 'execution_monitoring_end_at',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.DATE,
    })
    executionMonitoringEndAt: string;
        
             
        
    @ForeignKey(() => BplusItSappiFlowModel)
    
    @Column({
        field: 'flow_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
    })
    flowId: string;
        
    
    @BelongsTo(() => BplusItSappiFlowModel)
    flow: BplusItSappiFlowModel;
             
        
    @Column({
        field: 'flow_party',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    flowParty: string;
        
             
        
    @Column({
        field: 'flow_component',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    flowComponent: string;
        
             
        
    @Column({
        field: 'flow_interface_name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    flowInterfaceName: string;
        
             
        
    @Column({
        field: 'flow_interface_namespace',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    flowInterfaceNamespace: string;
        
             
        
    @Column({
        field: 'status',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.ENUM('SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING'),
    })
    status: string;
        
             
        
    @Column({
        field: 'detail',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.TEXT,
    })
    detail: string;
        
             
        
    @Column({
        field: 'example',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    example: string;
        
             
        
    @Column({
        field: 'start_time_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
    })
    startTimeAt: string;
        
             
        
    @Column({
        field: 'direction',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    direction: string;
        
             
        
    @Column({
        field: 'error_category',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    errorCategory: string;
        
             
        
    @Column({
        field: 'error_code',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    errorCode: string;
        
             
        
    @Column({
        field: 'error_label',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    errorLabel: string;
        
             
        
    @Column({
        field: 'node',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    node: number;
        
             
        
    @Column({
        field: 'protocol',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    protocol: string;
        
             
        
    @Column({
        field: 'quality_of_service',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    qualityOfService: string;
        
             
        
    @Column({
        field: 'receiver_party',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    receiverParty: string;
        
             
        
    @Column({
        field: 'receiver_component',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    receiverComponent: string;
        
             
        
    @Column({
        field: 'receiver_interface',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    receiverInterface: string;
        
             
        
    @Column({
        field: 'receiver_interface_namespace',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    receiverInterfaceNamespace: string;
        
             
        
    @Column({
        field: 'retries',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    retries: number;
        
             
        
    @Column({
        field: 'size',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    size: number;
        
             
        
    @Column({
        field: 'times_failed',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    timesFailed: number;
        
             
        
    @Column({
        field: 'created_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;
        
             
        
    @Column({
        field: 'updated_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;
        
             
        
    @Column({
        field: 'deleted_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;
        
            
}