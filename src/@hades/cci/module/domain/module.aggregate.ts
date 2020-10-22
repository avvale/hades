import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ModuleId,
    ModuleTenantId,
    ModuleTenantCode,
    ModuleSystemId,
    ModuleSystemName,
    ModuleChannelHash,
    ModuleChannelParty,
    ModuleChannelComponent,
    ModuleChannelName,
    ModuleFlowHash,
    ModuleFlowParty,
    ModuleFlowReceiverParty,
    ModuleFlowComponent,
    ModuleFlowReceiverComponent,
    ModuleFlowInterfaceName,
    ModuleFlowInterfaceNamespace,
    ModuleVersion,
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

import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';
import { CciSystem } from '@hades/cci/system/domain/system.aggregate';



export class CciModule extends AggregateRoot
{
    id: ModuleId;
    tenantId: ModuleTenantId;
    tenantCode: ModuleTenantCode;
    systemId: ModuleSystemId;
    systemName: ModuleSystemName;
    channelHash: ModuleChannelHash;
    channelParty: ModuleChannelParty;
    channelComponent: ModuleChannelComponent;
    channelName: ModuleChannelName;
    flowHash: ModuleFlowHash;
    flowParty: ModuleFlowParty;
    flowReceiverParty: ModuleFlowReceiverParty;
    flowComponent: ModuleFlowComponent;
    flowReceiverComponent: ModuleFlowReceiverComponent;
    flowInterfaceName: ModuleFlowInterfaceName;
    flowInterfaceNamespace: ModuleFlowInterfaceNamespace;
    version: ModuleVersion;
    parameterGroup: ModuleParameterGroup;
    name: ModuleName;
    parameterName: ModuleParameterName;
    parameterValue: ModuleParameterValue;
    createdAt: ModuleCreatedAt;
    updatedAt: ModuleUpdatedAt;
    deletedAt: ModuleDeletedAt;
    
    // eager relationship
    
    
    tenant: IamTenant;
    system: CciSystem;
    
    
    
    constructor(id?: ModuleId, tenantId?: ModuleTenantId, tenantCode?: ModuleTenantCode, systemId?: ModuleSystemId, systemName?: ModuleSystemName, channelHash?: ModuleChannelHash, channelParty?: ModuleChannelParty, channelComponent?: ModuleChannelComponent, channelName?: ModuleChannelName, flowHash?: ModuleFlowHash, flowParty?: ModuleFlowParty, flowReceiverParty?: ModuleFlowReceiverParty, flowComponent?: ModuleFlowComponent, flowReceiverComponent?: ModuleFlowReceiverComponent, flowInterfaceName?: ModuleFlowInterfaceName, flowInterfaceNamespace?: ModuleFlowInterfaceNamespace, version?: ModuleVersion, parameterGroup?: ModuleParameterGroup, name?: ModuleName, parameterName?: ModuleParameterName, parameterValue?: ModuleParameterValue, createdAt?: ModuleCreatedAt, updatedAt?: ModuleUpdatedAt, deletedAt?: ModuleDeletedAt, tenant?: IamTenant, system?: CciSystem, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.systemId = systemId;
        this.systemName = systemName;
        this.channelHash = channelHash;
        this.channelParty = channelParty;
        this.channelComponent = channelComponent;
        this.channelName = channelName;
        this.flowHash = flowHash;
        this.flowParty = flowParty;
        this.flowReceiverParty = flowReceiverParty;
        this.flowComponent = flowComponent;
        this.flowReceiverComponent = flowReceiverComponent;
        this.flowInterfaceName = flowInterfaceName;
        this.flowInterfaceNamespace = flowInterfaceNamespace;
        this.version = version;
        this.parameterGroup = parameterGroup;
        this.name = name;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
        // eager relationship
        
        
        this.tenant = tenant;
        this.system = system;
        
        
        
    }

    static register (id: ModuleId, tenantId: ModuleTenantId, tenantCode: ModuleTenantCode, systemId: ModuleSystemId, systemName: ModuleSystemName, channelHash: ModuleChannelHash, channelParty: ModuleChannelParty, channelComponent: ModuleChannelComponent, channelName: ModuleChannelName, flowHash: ModuleFlowHash, flowParty: ModuleFlowParty, flowReceiverParty: ModuleFlowReceiverParty, flowComponent: ModuleFlowComponent, flowReceiverComponent: ModuleFlowReceiverComponent, flowInterfaceName: ModuleFlowInterfaceName, flowInterfaceNamespace: ModuleFlowInterfaceNamespace, version: ModuleVersion, parameterGroup: ModuleParameterGroup, name: ModuleName, parameterName: ModuleParameterName, parameterValue: ModuleParameterValue, createdAt: ModuleCreatedAt, updatedAt: ModuleUpdatedAt, deletedAt: ModuleDeletedAt, tenant?: IamTenant, system?: CciSystem, ): CciModule
    {
        return new CciModule(id, tenantId, tenantCode, systemId, systemName, channelHash, channelParty, channelComponent, channelName, flowHash, flowParty, flowReceiverParty, flowComponent, flowReceiverComponent, flowInterfaceName, flowInterfaceNamespace, version, parameterGroup, name, parameterName, parameterValue, createdAt, updatedAt, deletedAt, tenant, system, );
    }

    created(module: CciModule): void
    {
        this.apply(
            new CreatedModuleEvent(
                module.id.value,
                module.tenantId.value,
                module.tenantCode.value,
                module.systemId.value,
                module.systemName.value,
                module.channelHash.value,
                module.channelParty?.value,
                module.channelComponent.value,
                module.channelName.value,
                module.flowHash?.value,
                module.flowParty?.value,
                module.flowReceiverParty?.value,
                module.flowComponent?.value,
                module.flowReceiverComponent?.value,
                module.flowInterfaceName?.value,
                module.flowInterfaceNamespace?.value,
                module.version.value,
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

    updated(module: CciModule): void
    {
        this.apply(
            new UpdatedModuleEvent(
                module.id.value,
                module.tenantId?.value,
                module.tenantCode?.value,
                module.systemId?.value,
                module.systemName?.value,
                module.channelHash?.value,
                module.channelParty?.value,
                module.channelComponent?.value,
                module.channelName?.value,
                module.flowHash?.value,
                module.flowParty?.value,
                module.flowReceiverParty?.value,
                module.flowComponent?.value,
                module.flowReceiverComponent?.value,
                module.flowInterfaceName?.value,
                module.flowInterfaceNamespace?.value,
                module.version?.value,
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

    deleted(module: CciModule): void
    {
        this.apply(
            new DeletedModuleEvent(
                module.id.value,
                module.tenantId.value,
                module.tenantCode.value,
                module.systemId.value,
                module.systemName.value,
                module.channelHash.value,
                module.channelParty?.value,
                module.channelComponent.value,
                module.channelName.value,
                module.flowHash?.value,
                module.flowParty?.value,
                module.flowReceiverParty?.value,
                module.flowComponent?.value,
                module.flowReceiverComponent?.value,
                module.flowInterfaceName?.value,
                module.flowInterfaceNamespace?.value,
                module.version.value,
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
            tenantCode: this.tenantCode.value,
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            channelHash: this.channelHash.value,
            channelParty: this.channelParty?.value,
            channelComponent: this.channelComponent.value,
            channelName: this.channelName.value,
            flowHash: this.flowHash?.value,
            flowParty: this.flowParty?.value,
            flowReceiverParty: this.flowReceiverParty?.value,
            flowComponent: this.flowComponent?.value,
            flowReceiverComponent: this.flowReceiverComponent?.value,
            flowInterfaceName: this.flowInterfaceName?.value,
            flowInterfaceNamespace: this.flowInterfaceNamespace?.value,
            version: this.version.value,
            parameterGroup: this.parameterGroup?.value,
            name: this.name?.value,
            parameterName: this.parameterName?.value,
            parameterValue: this.parameterValue?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
            // eager relationship
            
            
            tenant: this.tenant?.toDTO(),
            system: this.system?.toDTO(),
            
            
            
        }
    }
}
