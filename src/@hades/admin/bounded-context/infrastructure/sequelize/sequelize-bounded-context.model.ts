import { Column, Model, Table, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
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
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(255),
        
    })
    name: string;
        
             
        
    
    @Column({
        field: 'root',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(20),
        
    })
    root: string;
        
             
        
    
    @Column({
        field: 'sort',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
        
    })
    sort: number;
        
             
        
    
    @Column({
        field: 'is_active',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
    })
    isActive: boolean;
        
             
        
    
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