import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { BplusItSappiExecutionModel } from '@hades/bplus-it-sappi/execution/infrastructure/sequelize/sequelize-execution.model';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';

@Table({ modelName: 'bplus_it_sappi_data_lake', freezeTableName: true })
export class BplusItSappiDataLakeModel extends Model<BplusItSappiDataLakeModel> 
{ 
        
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;
        
             
        
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
             
        
    @Column({
        field: 'tenant_code',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(50),
    })
    tenantCode: string;
        
             
        
    @Column({
        field: 'payload',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.JSON,
    })
    payload: any;
        
             
        
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