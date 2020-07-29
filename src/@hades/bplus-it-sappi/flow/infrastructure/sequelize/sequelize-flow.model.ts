import { Column, Model, Table, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';

@Table({ modelName: 'bplus_it_sappi_flow', freezeTableName: true })
export class BplusItSappiFlowModel extends Model<BplusItSappiFlowModel> 
{ 
        
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
    })
    id: string;
        
             
        
    @Unique
    @Column({
        field: 'hash',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.CHAR(40),
        
    })
    hash: string;
        
             
        
    
    @Column({
        field: 'tenant_id',
        primaryKey: false,
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
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(50),
        
    })
    tenantCode: string;
        
             
        
    
    @Column({
        field: 'system_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {
            model: BplusItSappiSystemModel,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    systemId: string;
        
    
    @BelongsTo(() => BplusItSappiSystemModel)
    system: BplusItSappiSystemModel;
             
        
    
    @Column({
        field: 'system_name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(20),
        
    })
    systemName: string;
        
             
        
    
    @Column({
        field: 'version',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(20),
        
    })
    version: string;
        
             
        
    
    @Column({
        field: 'scenario',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(60),
        
    })
    scenario: string;
        
             
        
    
    @Column({
        field: 'party',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    party: string;
        
             
        
    
    @Column({
        field: 'component',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    component: string;
        
             
        
    
    @Column({
        field: 'interface_name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    interfaceName: string;
        
             
        
    
    @Column({
        field: 'interface_namespace',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    interfaceNamespace: string;
        
             
        
    
    @Column({
        field: 'iflow_name',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    iflowName: string;
        
             
        
    
    @Column({
        field: 'responsible_user_account',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(20),
        
    })
    responsibleUserAccount: string;
        
             
        
    
    @Column({
        field: 'last_change_user_account',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(20),
        
    })
    lastChangeUserAccount: string;
        
             
        
    
    @Column({
        field: 'last_changed_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
        
    })
    lastChangedAt: string;
        
             
        
    
    @Column({
        field: 'folder_path',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(255),
        
    })
    folderPath: string;
        
             
        
    
    @Column({
        field: 'description',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(255),
        
    })
    description: string;
        
             
        
    
    @Column({
        field: 'application',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(60),
        
    })
    application: string;
        
             
        
    
    @Column({
        field: 'is_critical',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
    })
    isCritical: boolean;
        
             
        
    
    @Column({
        field: 'is_complex',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
    })
    isComplex: boolean;
        
             
        
    
    @Column({
        field: 'field_group_id',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.UUID,
        
    })
    fieldGroupId: string;
        
             
        
    
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