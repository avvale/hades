import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { NfcTagModel } from '@hades/nfc/tag/infrastructure/sequelize/sequelize-tag.model';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';

@Table({ modelName: 'nfc_summary', freezeTableName: true })
export class NfcSummaryModel extends Model<NfcSummaryModel> 
{ 
        
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;
        
             
        
    @ForeignKey(() => NfcTagModel)
    
    @Column({
        field: 'tag_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
    })
    tagId: string;
        
    
    @BelongsTo(() => NfcTagModel)
    tag: NfcTagModel;
             
        
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
        field: 'access_at',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.DATE,
    })
    accessAt: string;
        
             
        
    @Column({
        field: 'counter',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    counter: number;
        
             
        
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