import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';
import { BplusItSappiExecutionModel } from '@hades/bplus-it-sappi/execution/infrastructure/sequelize/sequelize-execution.model';

@Table({ modelName: 'bplus_it_sappi_channel_detail', freezeTableName: true })
export class BplusItSappiChannelDetailModel extends Model<BplusItSappiChannelDetailModel> 
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
        
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {  
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
        
             
        
    @ForeignKey(() => BplusItSappiSystemModel)    
    
    
    @Column({
        field: 'system_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {  
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
        
             
        
    @ForeignKey(() => BplusItSappiExecutionModel)    
    
    
    @Column({
        field: 'execution_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {  
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
        field: 'status',
        
        allowNull: false,
        type: DataTypes.ENUM('ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED'),
        
    })
    status: string;
        
             
            
    @Index
    
    @Column({
        field: 'channel_hash',
        
        allowNull: false,
        type: DataTypes.CHAR(40),
        
    })
    channelHash: string;
        
             
            
    
    
    @Column({
        field: 'channel_sap_id',
        
        allowNull: false,
        type: DataTypes.STRING(50),
        
    })
    channelSapId: string;
        
             
            
    
    
    @Column({
        field: 'channel_party',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    channelParty: string;
        
             
            
    
    
    @Column({
        field: 'channel_component',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    channelComponent: string;
        
             
            
    
    
    @Column({
        field: 'channel_name',
        
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