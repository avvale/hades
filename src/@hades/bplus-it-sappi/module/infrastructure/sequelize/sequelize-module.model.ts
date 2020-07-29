import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
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
        field: 'channel_id',
        
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
    
 
             
            
    
    
    @Column({
        field: 'channel_party',
        
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    channelParty: string;
        
             
            
    
    
    @Column({
        field: 'channel_component',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    channelComponent: string;
        
             
            
    
    
    @Column({
        field: 'channel_name',
        
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    channelName: string;

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
        
        allowNull: true,
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
        field: 'parameter_group',
        
        allowNull: true,
        type: DataTypes.STRING(255),
        
    })
    parameterGroup: string;
        
             
            
    
    
    @Column({
        field: 'name',
        
        allowNull: true,
        type: DataTypes.STRING(320),
        
    })
    name: string;
        
             
            
    
    
    @Column({
        field: 'parameter_name',
        
        allowNull: true,
        type: DataTypes.STRING(320),
        
    })
    parameterName: string;
        
             
            
    
    
    @Column({
        field: 'parameter_value',
        
        allowNull: true,
        type: DataTypes.STRING(1024),
        
    })
    parameterValue: string;
        
             
            
    
    
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