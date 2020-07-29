import { Column, Model, Table, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';
import { BplusItSappiFlowModel } from '@hades/bplus-it-sappi/flow/infrastructure/sequelize/sequelize-flow.model';
import { BplusItSappiModuleModel } from '@hades/bplus-it-sappi/module/infrastructure/sequelize/sequelize-module.model';

@Table({ modelName: 'bplus_it_sappi_channel', freezeTableName: true })
export class BplusItSappiChannelModel extends Model<BplusItSappiChannelModel> 
{ 
        
    @Unique
    @Column({
        field: 'id',
        primaryKey: true,
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
        
             
        
    
    @Column({
        field: 'tenant_code',
        
        allowNull: false,
        type: DataTypes.STRING(50),
        
    })
    tenantCode: string;
        
             
        
    
    @Column({
        field: 'system_id',
        
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
        
             
        
    
    @Column({
        field: 'flow_id',
        
        allowNull: true,
        type: DataTypes.UUID,
        
        references: {
            model: BplusItSappiFlowModel,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    flowId: string;
        
             
        
    
    @Column({
        field: 'flow_party',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    flowParty: string;
        
             
        
    
    @Column({
        field: 'flow_component',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    flowComponent: string;
        
             
        
    
    @Column({
        field: 'flow_interface_name',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    flowInterfaceName: string;
        
             
        
    
    @Column({
        field: 'flow_interface_namespace',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    flowInterfaceNamespace: string;
        
             
        
    
    @Column({
        field: 'version',
        
        allowNull: false,
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
        
        allowNull: false,
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
        
        allowNull: false,
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
        
             
        
        
    @HasMany(() => BplusItSappiModuleModel)
    modules: BplusItSappiModuleModel[];
         
        
    
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