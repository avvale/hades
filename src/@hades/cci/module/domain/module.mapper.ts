import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { CciModule } from './module.aggregate';
import { ModuleResponse } from './module.response';
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

import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';



export class ModuleMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param module
     */
    mapModelToAggregate(module: ObjectLiteral): CciModule
    {
        if (!module) return;

        return this.makeAggregate(module);
    }

    /**
     * Map array of objects to array aggregates
     * @param modules 
     */
    mapModelsToAggregates(modules: ObjectLiteral[]): CciModule[]
    {
        if (!Array.isArray(modules)) return;
        
        return modules.map(module  => this.makeAggregate(module));
    }

    /**
     * Map aggregate to response
     * @param module 
     */
    mapAggregateToResponse(module: CciModule): ModuleResponse
    {
        return this.makeResponse(module);
    }

    /**
     * Map array of aggregates to array responses
     * @param modules
     */
    mapAggregatesToResponses(modules: CciModule[]): ModuleResponse[]
    {
        if (!Array.isArray(modules)) return;

        return modules.map(module => this.makeResponse(module));
    }

    private makeAggregate(module: ObjectLiteral): CciModule
    {
        return CciModule.register(
            new ModuleId(module.id),
            new ModuleTenantId(module.tenantId),
            new ModuleTenantCode(module.tenantCode),
            new ModuleSystemId(module.systemId),
            new ModuleSystemName(module.systemName),
            new ModuleChannelHash(module.channelHash),
            new ModuleChannelParty(module.channelParty),
            new ModuleChannelComponent(module.channelComponent),
            new ModuleChannelName(module.channelName),
            new ModuleFlowHash(module.flowHash),
            new ModuleFlowParty(module.flowParty),
            new ModuleFlowReceiverParty(module.flowReceiverParty),
            new ModuleFlowComponent(module.flowComponent),
            new ModuleFlowReceiverComponent(module.flowReceiverComponent),
            new ModuleFlowInterfaceName(module.flowInterfaceName),
            new ModuleFlowInterfaceNamespace(module.flowInterfaceNamespace),
            new ModuleVersion(module.version),
            new ModuleParameterGroup(module.parameterGroup),
            new ModuleName(module.name),
            new ModuleParameterName(module.parameterName),
            new ModuleParameterValue(module.parameterValue),
            new ModuleCreatedAt(module.createdAt),
            new ModuleUpdatedAt(module.updatedAt),
            new ModuleDeletedAt(module.deletedAt),
            
            
            
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(module.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(module.system) : undefined,
            
            
            
        );
    }

    private makeResponse(module: CciModule): ModuleResponse
    {
        if (!module) return;
        
        return new ModuleResponse(
            module.id.value,
            module.tenantId.value,
            module.tenantCode.value,
            module.systemId.value,
            module.systemName.value,
            module.channelHash.value,
            module.channelParty.value,
            module.channelComponent.value,
            module.channelName.value,
            module.flowHash.value,
            module.flowParty.value,
            module.flowReceiverParty.value,
            module.flowComponent.value,
            module.flowReceiverComponent.value,
            module.flowInterfaceName.value,
            module.flowInterfaceNamespace.value,
            module.version.value,
            module.parameterGroup.value,
            module.name.value,
            module.parameterName.value,
            module.parameterValue.value,
            module.createdAt.value,
            module.updatedAt.value,
            module.deletedAt.value,
            
            
            
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(module.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(module.system) : undefined,
            
            
            
        );
    }
}