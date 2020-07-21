import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
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
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(undefined),
    })
    name: string;
        
             
        
    @Column({
        field: 'code',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(undefined),
    })
    code: string;
        
             
        
    @Column({
        field: 'logo',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(undefined),
    })
    logo: string;
        
             
        
    @Column({
        field: 'is_active',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isActive: boolean;
        
             
        
    @Column({
        field: 'data',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.JSON,
    })
    data: any;
        
             
        
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