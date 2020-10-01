import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';

@Table({ modelName: 'cci_flow', freezeTableName: true })
export class CciFlowModel extends Model<CciFlowModel> 
{ 
        
    
    @Unique
    @Column({
        field: 'id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        
    })
    id: string;
        
             
        
    
    
    @Column({
        field: 'hash',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.CHAR(40),
        
        
    })
    hash: string;
        
             
        
    @ForeignKey(() => IamTenantModel)
    
    
    @Column({
        field: 'tenant_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        
        references: {  
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    tenantId: string;
        
    
    @BelongsTo(() => IamTenantModel)
    tenant: IamTenantModel;
             
        
    
    
    @Column({
        field: 'tenant_code',
        
        allowNull: false,
        type: DataTypes.STRING(50),
        
        
    })
    tenantCode: string;
        
             
        
    @ForeignKey(() => CciSystemModel)
    
    
    @Column({
        field: 'system_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        
        references: {  
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    systemId: string;
        
    
    @BelongsTo(() => CciSystemModel)
    system: CciSystemModel;
             
        
    
    
    @Column({
        field: 'system_name',
        
        allowNull: false,
        type: DataTypes.STRING(20),
        
        
    })
    systemName: string;
        
             
        
    
    
    @Column({
        field: 'version',
        
        allowNull: false,
        type: DataTypes.STRING(20),
        
        
    })
    version: string;
        
             
        
    
    
    @Column({
        field: 'scenario',
        
        allowNull: true,
        type: DataTypes.STRING(60),
        
        
    })
    scenario: string;
        
             
        
    
    
    @Column({
        field: 'party',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    party: string;
        
             
        
    
    
    @Column({
        field: 'receiver_party',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    receiverParty: string;
        
             
        
    
    
    @Column({
        field: 'component',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
        
    })
    component: string;
        
             
        
    
    
    @Column({
        field: 'receiver_component',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    receiverComponent: string;
        
             
        
    
    
    @Column({
        field: 'interface_name',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
        
    })
    interfaceName: string;
        
             
        
    
    
    @Column({
        field: 'interface_namespace',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
        
    })
    interfaceNamespace: string;
        
             
        
    
    
    @Column({
        field: 'iflow_name',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    iflowName: string;
        
             
        
    
    
    @Column({
        field: 'responsible_user_account',
        
        allowNull: true,
        type: DataTypes.STRING(20),
        
        
    })
    responsibleUserAccount: string;
        
             
        
    
    
    @Column({
        field: 'last_change_user_account',
        
        allowNull: true,
        type: DataTypes.STRING(20),
        
        
    })
    lastChangeUserAccount: string;
        
             
        
    
    
    @Column({
        field: 'last_changed_at',
        
        allowNull: true,
        type: DataTypes.DATE,
        
        
    })
    lastChangedAt: string;
        
             
        
    
    
    @Column({
        field: 'folder_path',
        
        allowNull: true,
        type: DataTypes.STRING(255),
        
        
    })
    folderPath: string;
        
             
        
    
    
    @Column({
        field: 'description',
        
        allowNull: true,
        type: DataTypes.STRING(255),
        
        
    })
    description: string;
        
             
        
    
    
    @Column({
        field: 'application',
        
        allowNull: true,
        type: DataTypes.STRING(60),
        
        
    })
    application: string;
        
             
        
    
    
    @Column({
        field: 'is_critical',
        
        allowNull: true,
        type: DataTypes.BOOLEAN,
        
        defaultValue: false,
        
    })
    isCritical: boolean;
        
             
        
    
    
    @Column({
        field: 'is_complex',
        
        allowNull: true,
        type: DataTypes.BOOLEAN,
        
        defaultValue: false,
        
    })
    isComplex: boolean;
        
             
        
    
    
    @Column({
        field: 'field_group_id',
        
        allowNull: true,
        type: DataTypes.UUID,
        
        
    })
    fieldGroupId: string;
        
             
        
    
    
    @Column({
        field: 'data',
        
        allowNull: true,
        type: DataTypes.JSON,
        
        
    })
    data: any;
        
             
        
    
    
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