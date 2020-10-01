import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';

@Table({ modelName: 'cci_system', freezeTableName: true })
export class CciSystemModel extends Model<CciSystemModel> 
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
        
    
    @BelongsTo(() => IamTenantModel)
    tenant: IamTenantModel;
             
        
    
    
    @Column({
        field: 'tenant_code',
        
        allowNull: false,
        type: DataTypes.STRING(50),
        
        
    })
    tenantCode: string;
        
             
        
    
    
    @Column({
        field: 'version',
        
        allowNull: false,
        type: DataTypes.STRING(undefined),
        
        
    })
    version: string;
        
             
        
    
    
    @Column({
        field: 'name',
        
        allowNull: false,
        type: DataTypes.STRING(undefined),
        
        
    })
    name: string;
        
             
        
    
    
    @Column({
        field: 'environment',
        
        allowNull: false,
        type: DataTypes.STRING(undefined),
        
        
    })
    environment: string;
        
             
        
    
    
    @Column({
        field: 'is_active',
        
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
        
    })
    isActive: boolean;
        
             
        
    
    
    @Column({
        field: 'cancelled_at',
        
        allowNull: true,
        type: DataTypes.DATE,
        
        
    })
    cancelledAt: string;
        
             
        
    
    
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