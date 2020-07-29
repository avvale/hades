import { Column, Model, Table, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
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
        
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        
    })
    code: number;
        
             
        
    
    @Column({
        field: 'tenant_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {
            model: AdminTenantModel,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    tenantId: string;
        
    
    @BelongsTo(() => AdminTenantModel)
    tenant: AdminTenantModel;
             
        
    
    @Column({
        field: 'tenant_code',
        
        allowNull: false,
        type: DataTypes.STRING(50),
        
    })
    tenantCode: string;
        
             
        
    
    @Column({
        field: 'url_base',
        
        allowNull: false,
        type: DataTypes.STRING(255),
        
    })
    urlBase: string;
        
             
        
    
    @Column({
        field: 'params',
        
        allowNull: true,
        type: DataTypes.JSON,
        
    })
    params: any;
        
             
        
    
    @Column({
        field: 'offset',
        
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
        
    })
    offset: number;
        
             
        
    
    @Column({
        field: 'is_session_required',
        
        allowNull: true,
        type: DataTypes.BOOLEAN,
        
    })
    isSessionRequired: boolean;
        
             
        
    
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