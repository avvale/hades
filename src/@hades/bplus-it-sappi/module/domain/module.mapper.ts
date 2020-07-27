import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiModule } from './module.aggregate';
import { ModuleResponse } from './module.response';
import { 
    ModuleId, 
    ModuleTenantId, 
    ModuleTenantCode, 
    ModuleVersion, 
    ModuleSystemId, 
    ModuleSystemName, 
    ModuleChannelId, 
    ModuleChannelParty, 
    ModuleChannelComponent, 
    ModuleChannelName, 
    ModuleFlowId, 
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

export class ModuleMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param module
     */
    mapObjectToAggregate(module: ObjectLiteral): BplusItSappiModule
    {
        return this.makeAggregate(module);
    }

    /**
     * Map array of objects to array aggregates
     * @param modules 
     */
    mapObjectsToAggregates(modules: ObjectLiteral[]): BplusItSappiModule[]
    {
        return modules.map(module  => this.makeAggregate(module ));
    }

    /**
     * Map aggregate to response
     * @param module 
     */
    mapAggregateToResponse(module: BplusItSappiModule): ModuleResponse
    {
        return this.makeResponse(module);
    }

    /**
     * Map array of aggregates to array responses
     * @param modules
     */
    mapAggregatesToResponses(modules: BplusItSappiModule[]): ModuleResponse[]
    {
        return modules.map(module => this.makeResponse(module));
    }

    private makeAggregate(module: ObjectLiteral): BplusItSappiModule
    {
        return BplusItSappiModule.register(
            new ModuleId(module.id),
            new ModuleTenantId(module.tenantId),
            new ModuleTenantCode(module.tenantCode),
            new ModuleVersion(module.version),
            new ModuleSystemId(module.systemId),
            new ModuleSystemName(module.systemName),
            new ModuleChannelId(module.channelId),
            new ModuleChannelParty(module.channelParty),
            new ModuleChannelComponent(module.channelComponent),
            new ModuleChannelName(module.channelName),
            new ModuleFlowId(module.flowId),
            new ModuleFlowParty(module.flowParty),
            new ModuleFlowComponent(module.flowComponent),
            new ModuleFlowInterfaceName(module.flowInterfaceName),
            new ModuleFlowInterfaceNamespace(module.flowInterfaceNamespace),
            new ModuleParameterGroup(module.parameterGroup),
            new ModuleName(module.name),
            new ModuleParameterName(module.parameterName),
            new ModuleParameterValue(module.parameterValue),
            new ModuleCreatedAt(module.createdAt),
            new ModuleUpdatedAt(module.updatedAt),
            new ModuleDeletedAt(module.deletedAt),
              
        );
    }

    private makeResponse(module: BplusItSappiModule): ModuleResponse
    {
        return new ModuleResponse(
            module.id.value,
            module.tenantId.value,
            module.tenantCode.value,
            module.version.value,
            module.systemId.value,
            module.systemName.value,
            module.channelId.value,
            module.channelParty.value,
            module.channelComponent.value,
            module.channelName.value,
            module.flowId.value,
            module.flowParty.value,
            module.flowComponent.value,
            module.flowInterfaceName.value,
            module.flowInterfaceNamespace.value,
            module.parameterGroup.value,
            module.name.value,
            module.parameterName.value,
            module.parameterValue.value,
            module.createdAt.value,
            module.updatedAt.value,
            module.deletedAt.value,
            
        );
    }
}