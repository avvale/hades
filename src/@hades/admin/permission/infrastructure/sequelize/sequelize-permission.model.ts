import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminModuleModel } from '@hades/admin/module/infrastructure/sequelize/sequelize-module.model';

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
        
             
        
    @ForeignKey(() => AdminModuleModel)
    
    @Column({
        field: 'module_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
    })
    moduleId: string;
        
    
    @BelongsTo(() => AdminModuleModel)
    module: AdminModuleModel;
             
        
    @Column({
        field: 'name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;
        
             
        
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