import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';

@Table({ modelName: 'nfc_tag', freezeTableName: true })
export class NfcTagModel extends Model<NfcTagModel> 
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
        primaryKey: false,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    code: number;
        
             
        
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
        field: 'url_base',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    urlBase: string;
        
             
        
    @Column({
        field: 'params',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.JSON,
    })
    params: any;
        
             
        
    @Column({
        field: 'offset',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    offset: number;
        
             
        
    @Column({
        field: 'is_session_required',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.BOOLEAN,
    })
    isSessionRequired: boolean;
        
             
        
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