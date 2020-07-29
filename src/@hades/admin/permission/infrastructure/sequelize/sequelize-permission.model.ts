import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminBoundedContextModel } from '@hades/admin/bounded-context/infrastructure/sequelize/sequelize-bounded-context.model';

@Table({ modelName: 'admin_permission', freezeTableName: true })
export class AdminPermissionModel extends Model<AdminPermissionModel> 
{ 
            
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
    })
    id: string;
        
             
        
    @ForeignKey(() => AdminBoundedContextModel)    
    
    
    @Column({
        field: 'bounded_context_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {  
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    boundedContextId: string;
        
    
    @BelongsTo(() => AdminBoundedContextModel)
    boundedContext: AdminBoundedContextModel;
             
            
    
    
    @Column({
        field: 'name',
        
        allowNull: false,
        type: DataTypes.STRING(255),
        
    })
    name: string;
        
             
            
    
    
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