import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';

@Table({ modelName: 'bplus_it_sappi_job_overview', freezeTableName: true })
export class BplusItSappiJobOverviewModel extends Model<BplusItSappiJobOverviewModel> 
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
        
             
        
    @Column({
        field: 'cancelled',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    cancelled: number;
        
             
        
    @Column({
        field: 'completed',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    completed: number;
        
             
        
    @Column({
        field: 'error',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    error: number;
        
             
        
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