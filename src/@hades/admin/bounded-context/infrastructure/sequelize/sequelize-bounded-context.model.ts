import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ modelName: 'admin_bounded_context', freezeTableName: true })
export class AdminBoundedContextModel extends Model<AdminBoundedContextModel> 
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
        type: DataTypes.STRING(255),
        
    })
    name: string;
        
             
            
    
    
    @Column({
        field: 'root',
        
        allowNull: false,
        type: DataTypes.STRING(20),
        
    })
    root: string;
        
             
            
    
    
    @Column({
        field: 'sort',
        
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
        
    })
    sort: number;
        
             
            
    
    
    @Column({
        field: 'is_active',
        
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
    })
    isActive: boolean;
        
             
            
    
    
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