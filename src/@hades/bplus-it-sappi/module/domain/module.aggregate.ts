import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ModuleId, 
    ModuleTenantId, 
    ModuleSystemId, 
    ModuleSystemName, 
    ModuleChannelId, 
    ModuleChannelParty, 
    ModuleChannelComponent, 
    ModuleChannelName, 
    ModuleFlowParty, 
    ModuleFlowComponent, 
    ModuleFlowInterfaceName, 
    ModuleFlowInterfaceNamespace, 
    ModuleParameterGroup, 
    ModuleName, 
    ModuleParameterName, 
    ModuleParameterValue, 
    ModuleCreatedAt, 
    ModuleUpdatedAt, 
    ModuleDeletedAt
    
} from './value-objects';
import { CreatedModuleEvent } from './../application/events/created-module.event';
import { UpdatedModuleEvent } from './../application/events/updated-module.event';
import { DeletedModuleEvent } from './../application/events/deleted-module.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.aggregate';
import { BplusItSappiChannel } from '@hades/bplus-it-sappi/channel/domain/channel.aggregate';

export class BplusItSappiModule extends AggregateRoot
{
    id: ModuleId;
    tenantId: ModuleTenantId;
    tenant: AdminTenant;
    systemId: ModuleSystemId;
    system: BplusItSappiSystem;
    systemName: ModuleSystemName;
    channelId: ModuleChannelId;
    channel: BplusItSappiChannel;
    channelParty: ModuleChannelParty;
    channelComponent: ModuleChannelComponent;
    channelName: ModuleChannelName;
    flowParty: ModuleFlowParty;
    flowComponent: ModuleFlowComponent;
    flowInterfaceName: ModuleFlowInterfaceName;
    flowInterfaceNamespace: ModuleFlowInterfaceNamespace;
    parameterGroup: ModuleParameterGroup;
    name: ModuleName;
    parameterName: ModuleParameterName;
    parameterValue: ModuleParameterValue;
    createdAt: ModuleCreatedAt;
    updatedAt: ModuleUpdatedAt;
    deletedAt: ModuleDeletedAt;
    
    constructor(id?: ModuleId, tenantId?: ModuleTenantId, systemId?: ModuleSystemId, systemName?: ModuleSystemName, channelId?: ModuleChannelId, channelParty?: ModuleChannelParty, channelComponent?: ModuleChannelComponent, channelName?: ModuleChannelName, flowParty?: ModuleFlowParty, flowComponent?: ModuleFlowComponent, flowInterfaceName?: ModuleFlowInterfaceName, flowInterfaceNamespace?: ModuleFlowInterfaceNamespace, parameterGroup?: ModuleParameterGroup, name?: ModuleName, parameterName?: ModuleParameterName, parameterValue?: ModuleParameterValue, createdAt?: ModuleCreatedAt, updatedAt?: ModuleUpdatedAt, deletedAt?: ModuleDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.systemId = systemId;
        this.systemName = systemName;
        this.channelId = channelId;
        this.channelParty = channelParty;
        this.channelComponent = channelComponent;
        this.channelName = channelName;
        this.flowParty = flowParty;
        this.flowComponent = flowComponent;
        this.flowInterfaceName = flowInterfaceName;
        this.flowInterfaceNamespace = flowInterfaceNamespace;
        this.parameterGroup = parameterGroup;
        this.name = name;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: ModuleId, tenantId: ModuleTenantId, systemId: ModuleSystemId, systemName: ModuleSystemName, channelId: ModuleChannelId, channelParty: ModuleChannelParty, channelComponent: ModuleChannelComponent, channelName: ModuleChannelName, flowParty: ModuleFlowParty, flowComponent: ModuleFlowComponent, flowInterfaceName: ModuleFlowInterfaceName, flowInterfaceNamespace: ModuleFlowInterfaceNamespace, parameterGroup: ModuleParameterGroup, name: ModuleName, parameterName: ModuleParameterName, parameterValue: ModuleParameterValue, createdAt: ModuleCreatedAt, updatedAt: ModuleUpdatedAt, deletedAt: ModuleDeletedAt, ): BplusItSappiModule
    {
        return new BplusItSappiModule(id, tenantId, systemId, systemName, channelId, channelParty, channelComponent, channelName, flowParty, flowComponent, flowInterfaceName, flowInterfaceNamespace, parameterGroup, name, parameterName, parameterValue, createdAt, updatedAt, deletedAt, );
    }

    created(module: BplusItSappiModule): void
    {
        this.apply(
            new CreatedModuleEvent(
                module.id.value,
                module.tenantId.value,
                module.systemId.value,
                module.systemName.value,
                module.channelId.value,
                module.channelParty?.value,
                module.channelComponent.value,
                module.channelName.value,
                module.flowParty?.value,
                module.flowComponent.value,
                module.flowInterfaceName.value,
                module.flowInterfaceNamespace.value,
                module.parameterGroup?.value,
                module.name?.value,
                module.parameterName?.value,
                module.parameterValue?.value,
                module.createdAt?.value,
                module.updatedAt?.value,
                module.deletedAt?.value,
                
            )
        );
    }

    updated(module: BplusItSappiModule): void
    {
        this.apply(
            new UpdatedModuleEvent(
                module.id.value,
                module.tenantId?.value,
                module.systemId?.value,
                module.systemName?.value,
                module.channelId?.value,
                module.channelParty?.value,
                module.channelComponent?.value,
                module.channelName?.value,
                module.flowParty?.value,
                module.flowComponent?.value,
                module.flowInterfaceName?.value,
                module.flowInterfaceNamespace?.value,
                module.parameterGroup?.value,
                module.name?.value,
                module.parameterName?.value,
                module.parameterValue?.value,
                module.createdAt?.value,
                module.updatedAt?.value,
                module.deletedAt?.value,
                
            )
        );
    }

    deleted(module: BplusItSappiModule): void
    {
        this.apply(
            new DeletedModuleEvent(
                module.id.value,
                module.tenantId.value,
                module.systemId.value,
                module.systemName.value,
                module.channelId.value,
                module.channelParty?.value,
                module.channelComponent.value,
                module.channelName.value,
                module.flowParty?.value,
                module.flowComponent.value,
                module.flowInterfaceName.value,
                module.flowInterfaceNamespace.value,
                module.parameterGroup?.value,
                module.name?.value,
                module.parameterName?.value,
                module.parameterValue?.value,
                module.createdAt?.value,
                module.updatedAt?.value,
                module.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tenantId: this.tenantId.value,
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            channelId: this.channelId.value,
            channelParty: this.channelParty?.value,
            channelComponent: this.channelComponent.value,
            channelName: this.channelName.value,
            flowParty: this.flowParty?.value,
            flowComponent: this.flowComponent.value,
            flowInterfaceName: this.flowInterfaceName.value,
            flowInterfaceNamespace: this.flowInterfaceNamespace.value,
            parameterGroup: this.parameterGroup?.value,
            name: this.name?.value,
            parameterName: this.parameterName?.value,
            parameterValue: this.parameterValue?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
