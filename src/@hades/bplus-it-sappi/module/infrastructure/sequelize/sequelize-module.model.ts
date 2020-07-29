import { Column, Model, Table, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';
import { BplusItSappiChannelModel } from '@hades/bplus-it-sappi/channel/infrastructure/sequelize/sequelize-channel.model';
import { BplusItSappiFlowModel } from '@hades/bplus-it-sappi/flow/infrastructure/sequelize/sequelize-flow.model';

@Table({ modelName: 'bplus_it_sappi_module', freezeTableName: true })
export class BplusItSappiModuleModel extends Model<BplusItSappiModuleModel> 
{ 
        
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
    })
    id: string;
        
             
        
    
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
        field: 'channel_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {
            model: BplusItSappiChannelModel,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    channelId: string;
        
    
    @BelongsTo(() => BplusItSappiChannelModel)
    channel: BplusItSappiChannelModel;
             
        
    
    @Column({
        field: 'channel_party',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    channelParty: string;
        
             
        
    
    @Column({
        field: 'channel_component',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    channelComponent: string;
        
             
        
    
    @Column({
        field: 'channel_name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    channelName: string;
        
             
        
    
    @Column({
        field: 'flow_id',
        primaryKey: false,
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
        
    
    @BelongsTo(() => BplusItSappiFlowModel)
    flow: BplusItSappiFlowModel;
             
        
    
    @Column({
        field: 'flow_party',
        primaryKey: false,
        allowNull: true,
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
        field: 'version',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(20),
        
    })
    version: string;
        
             
        
    
    @Column({
        field: 'parameter_group',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(255),
        
    })
    parameterGroup: string;
        
             
        
    
    @Column({
        field: 'name',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(320),
        
    })
    name: string;
        
             
        
    
    @Column({
        field: 'parameter_name',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(320),
        
    })
    parameterName: string;
        
             
        
    
    @Column({
        field: 'parameter_value',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(1024),
        
    })
    parameterValue: string;
        
             
        
    
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