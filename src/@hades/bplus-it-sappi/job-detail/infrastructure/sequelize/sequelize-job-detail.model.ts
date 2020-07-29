import { Column, Model, Table, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';
import { BplusItSappiExecutionModel } from '@hades/bplus-it-sappi/execution/infrastructure/sequelize/sequelize-execution.model';

@Table({ modelName: 'bplus_it_sappi_job_detail', freezeTableName: true })
export class BplusItSappiJobDetailModel extends Model<BplusItSappiJobDetailModel> 
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
        
             
        
    
    @Column({
        field: 'system_name',
        
        allowNull: false,
        type: DataTypes.STRING(20),
        
    })
    systemName: string;
        
             
        
    
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
        field: 'return_code',
        
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
        field: 'start_at',
        
        allowNull: false,
        type: DataTypes.DATE,
        
    })
    startAt: string;
        
             
        
    
    @Column({
        field: 'end_at',
        
        allowNull: false,
        type: DataTypes.DATE,
        
    })
    endAt: string;
        
             
        
    
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