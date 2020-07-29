import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ modelName: 'admin_tenant', freezeTableName: true })
export class AdminTenantModel extends Model<AdminTenantModel> 
{ 
            
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
    })
    id: string;
        
             
            
    
    
    @Column({
        field: 'name',
        
        allowNull: false,
        type: DataTypes.STRING(undefined),
        
    })
    name: string;
        
             
            
    
    
    @Column({
        field: 'code',
        
        allowNull: false,
        type: DataTypes.STRING(50),
        
    })
    code: string;
        
             
            
    
    
    @Column({
        field: 'logo',
        
        allowNull: true,
        type: DataTypes.STRING(undefined),
        
    })
    logo: string;
        
             
            
    
    
    @Column({
        field: 'is_active',
        
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
    })
    isActive: boolean;
        
             
            
    
    
    @Column({
        field: 'data',
        
        allowNull: true,
        type: DataTypes.JSON,
        
    })
    data: any;
        
             
            
    
    
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