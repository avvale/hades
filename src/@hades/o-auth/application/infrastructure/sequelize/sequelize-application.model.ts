import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ modelName: 'o_auth_application', freezeTableName: true })
export class OAuthApplicationModel extends Model<OAuthApplicationModel> 
{ 
            
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
    })
    id: string;
        
             
            
    
    
    @Column({
        field: 'code',
        
        allowNull: false,
        type: DataTypes.STRING(20),
        
    })
    code: string;
        
             
            
    
    
    @Column({
        field: 'secret',
        
        allowNull: false,
        type: DataTypes.STRING(90),
        
    })
    secret: string;
        
             
            
    
    
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