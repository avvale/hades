import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';
import { BplusItSappiFlowModel } from '@hades/bplus-it-sappi/flow/infrastructure/sequelize/sequelize-flow.model';
import { BplusItSappiModuleModel } from '@hades/bplus-it-sappi/module/infrastructure/sequelize/sequelize-module.model';

@Table({ modelName: 'bplus_it_sappi_channel', freezeTableName: true })
export class BplusItSappiChannelModel extends Model<BplusItSappiChannelModel> 
{ 
        
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;
        
             
        
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
        
             
        
    @ForeignKey(() => BplusItSappiSystemModel)
    
    @Column({
        field: 'system_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
    })
    systemId: string;
        
    
    @BelongsTo(() => BplusItSappiSystemModel)
    system: BplusItSappiSystemModel;
             
        
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
        field: 'name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    name: string;
        
             
        
    @ForeignKey(() => BplusItSappiFlowModel)
    
    @Column({
        field: 'flow_id',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.UUID,
    })
    flowId: string;
        
    
    @BelongsTo(() => BplusItSappiFlowModel)
    flow: BplusItSappiFlowModel;
             
        
    @Column({
        field: 'flow_party',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    flowParty: string;
        
             
        
    @Column({
        field: 'flow_component',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    flowComponent: string;
        
             
        
    @Column({
        field: 'flow_interface_name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    flowInterfaceName: string;
        
             
        
    @Column({
        field: 'flow_interface_namespace',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    flowInterfaceNamespace: string;
        
             
        
    @Column({
        field: 'adapter_type',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    adapterType: string;
        
             
        
    @Column({
        field: 'direction',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.ENUM('SENDER','RECEIVER'),
    })
    direction: string;
        
             
        
    @Column({
        field: 'transport_protocol',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    transportProtocol: string;
        
             
        
    @Column({
        field: 'message_protocol',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    messageProtocol: string;
        
             
        
    @Column({
        field: 'adapter_engine_name',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    adapterEngineName: string;
        
             
        
    @Column({
        field: 'url',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(320),
    })
    url: string;
        
             
        
    @Column({
        field: 'username',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    username: string;
        
             
        
    @Column({
        field: 'remote_host',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    remoteHost: string;
        
             
        
    @Column({
        field: 'remote_port',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    remotePort: number;
        
             
        
    @Column({
        field: 'directory',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(1024),
    })
    directory: string;
        
             
        
    @Column({
        field: 'file_schema',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(1024),
    })
    fileSchema: string;
        
             
        
    @Column({
        field: 'proxy_host',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    proxyHost: string;
        
             
        
    @Column({
        field: 'proxy_port',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    proxyPort: number;
        
             
        
    @Column({
        field: 'destination',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    destination: string;
        
             
        
    @Column({
        field: 'adapter_status',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.ENUM('ACTIVE','INACTIVE'),
    })
    adapterStatus: string;
        
             
        
    @Column({
        field: 'software_component_name',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    softwareComponentName: string;
        
             
        
    @Column({
        field: 'responsible_user_account_name',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    responsibleUserAccountName: string;
        
             
        
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
        
             
        
        
    @HasMany(() => BplusItSappiModuleModel)
    modules: BplusItSappiModuleModel[];
         
        
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