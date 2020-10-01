import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';

@Table({ modelName: 'cci_channel', freezeTableName: true })
export class CciChannelModel extends Model<CciChannelModel> 
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
        
             
        
    @ForeignKey(() => AdminTenantModel)
    
    
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
        
    
    @BelongsTo(() => AdminTenantModel)
    tenant: AdminTenantModel;
             
        
    
    
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
        field: 'party',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    party: string;
        
             
        
    
    
    @Column({
        field: 'component',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
        
    })
    component: string;
        
             
        
    
    
    @Column({
        field: 'name',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
        
    })
    name: string;
        
             
        
    // @Index
    
    @Column({
        field: 'flow_hash',
        
        allowNull: true,
        type: DataTypes.CHAR(40),
        
        
    })
    flowHash: string;
        
             
        
    
    
    @Column({
        field: 'flow_party',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    flowParty: string;
        
             
        
    
    
    @Column({
        field: 'flow_receiver_party',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    flowReceiverParty: string;
        
             
        
    
    
    @Column({
        field: 'flow_component',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    flowComponent: string;
        
             
        
    
    
    @Column({
        field: 'flow_receiver_component',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    flowReceiverComponent: string;
        
             
        
    
    
    @Column({
        field: 'flow_interface_name',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    flowInterfaceName: string;
        
             
        
    
    
    @Column({
        field: 'flow_interface_namespace',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    flowInterfaceNamespace: string;
        
             
        
    
    
    @Column({
        field: 'version',
        
        allowNull: true,
        type: DataTypes.STRING(20),
        
        
    })
    version: string;
        
             
        
    
    
    @Column({
        field: 'adapter_type',
        
        allowNull: true,
        type: DataTypes.STRING(60),
        
        
    })
    adapterType: string;
        
             
        
    
    
    @Column({
        field: 'direction',
        
        allowNull: true,
        type: DataTypes.ENUM('SENDER','RECEIVER'),
        
        
    })
    direction: string;
        
             
        
    
    
    @Column({
        field: 'transport_protocol',
        
        allowNull: true,
        type: DataTypes.STRING(60),
        
        
    })
    transportProtocol: string;
        
             
        
    
    
    @Column({
        field: 'message_protocol',
        
        allowNull: true,
        type: DataTypes.STRING(60),
        
        
    })
    messageProtocol: string;
        
             
        
    
    
    @Column({
        field: 'adapter_engine_name',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    adapterEngineName: string;
        
             
        
    
    
    @Column({
        field: 'url',
        
        allowNull: true,
        type: DataTypes.STRING(320),
        
        
    })
    url: string;
        
             
        
    
    
    @Column({
        field: 'username',
        
        allowNull: true,
        type: DataTypes.STRING(60),
        
        
    })
    username: string;
        
             
        
    
    
    @Column({
        field: 'remote_host',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    remoteHost: string;
        
             
        
    
    
    @Column({
        field: 'remote_port',
        
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
        
    })
    remotePort: number;
        
             
        
    
    
    @Column({
        field: 'directory',
        
        allowNull: true,
        type: DataTypes.STRING(1024),
        
        
    })
    directory: string;
        
             
        
    
    
    @Column({
        field: 'file_schema',
        
        allowNull: true,
        type: DataTypes.STRING(1024),
        
        
    })
    fileSchema: string;
        
             
        
    
    
    @Column({
        field: 'proxy_host',
        
        allowNull: true,
        type: DataTypes.STRING(60),
        
        
    })
    proxyHost: string;
        
             
        
    
    
    @Column({
        field: 'proxy_port',
        
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
        
    })
    proxyPort: number;
        
             
        
    
    
    @Column({
        field: 'destination',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    destination: string;
        
             
        
    
    
    @Column({
        field: 'adapter_status',
        
        allowNull: true,
        type: DataTypes.ENUM('ACTIVE','INACTIVE'),
        
        
    })
    adapterStatus: string;
        
             
        
    
    
    @Column({
        field: 'software_component_name',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    softwareComponentName: string;
        
             
        
    
    
    @Column({
        field: 'responsible_user_account_name',
        
        allowNull: true,
        type: DataTypes.STRING(20),
        
        
    })
    responsibleUserAccountName: string;
        
             
        
    
    
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
        field: 'ri_interface_name',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    riInterfaceName: string;
        
             
        
    
    
    @Column({
        field: 'ri_interface_namespace',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
        
    })
    riInterfaceNamespace: string;
        
             
        
    
    
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