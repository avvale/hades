import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';

@Table({ modelName: 'cci_module', freezeTableName: true })
export class CciModuleModel extends Model<CciModuleModel> 
{ 
        
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
        
    })
    id: string;
        
             
        
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
        
             
        
    // @Index
    
    @Column({
        field: 'channel_hash',
        
        allowNull: false,
        type: DataTypes.CHAR(40),
        
        
    })
    channelHash: string;
        
             
        
    
    
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
        type: DataTypes.STRING(2048),
        
        
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