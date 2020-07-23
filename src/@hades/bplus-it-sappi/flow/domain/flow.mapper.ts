import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiFlow } from './flow.aggregate';
import { FlowResponse } from './flow.response';
import { 
    FlowId, 
    FlowTenantId, 
    FlowTenantCode, 
    FlowSystemId, 
    FlowSystemName, 
    FlowScenario, 
    FlowParty, 
    FlowComponent, 
    FlowInterfaceName, 
    FlowInterfaceNamespace, 
    FlowIflowName, 
    FlowResponsibleUserAccount, 
    FlowLastChangeUserAccount, 
    FlowLastChangedAt, 
    FlowFolderPath, 
    FlowDescription, 
    FlowApplication, 
    FlowIsCritical, 
    FlowIsComplex, 
    FlowFieldGroupId, 
    FlowData, 
    FlowCreatedAt, 
    FlowUpdatedAt, 
    FlowDeletedAt
    
} from './value-objects';

export class FlowMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param flow
     */
    mapObjectToAggregate(flow: ObjectLiteral): BplusItSappiFlow
    {
        return this.makeAggregate(flow);
    }

    /**
     * Map array of objects to array aggregates
     * @param flows 
     */
    mapObjectsToAggregates(flows: ObjectLiteral[]): BplusItSappiFlow[]
    {
        return flows.map(flow  => this.makeAggregate(flow ));
    }

    /**
     * Map aggregate to response
     * @param flow 
     */
    mapAggregateToResponse(flow: BplusItSappiFlow): FlowResponse
    {
        return this.makeResponse(flow);
    }

    /**
     * Map array of aggregates to array responses
     * @param flows
     */
    mapAggregatesToResponses(flows: BplusItSappiFlow[]): FlowResponse[]
    {
        return flows.map(flow => this.makeResponse(flow));
    }

    private makeAggregate(flow: ObjectLiteral): BplusItSappiFlow
    {
        return BplusItSappiFlow.register(
            new FlowId(flow.id),
            new FlowTenantId(flow.tenantId),
            new FlowTenantCode(flow.tenantCode),
            new FlowSystemId(flow.systemId),
            new FlowSystemName(flow.systemName),
            new FlowScenario(flow.scenario),
            new FlowParty(flow.party),
            new FlowComponent(flow.component),
            new FlowInterfaceName(flow.interfaceName),
            new FlowInterfaceNamespace(flow.interfaceNamespace),
            new FlowIflowName(flow.iflowName),
            new FlowResponsibleUserAccount(flow.responsibleUserAccount),
            new FlowLastChangeUserAccount(flow.lastChangeUserAccount),
            new FlowLastChangedAt(flow.lastChangedAt),
            new FlowFolderPath(flow.folderPath),
            new FlowDescription(flow.description),
            new FlowApplication(flow.application),
            new FlowIsCritical(flow.isCritical),
            new FlowIsComplex(flow.isComplex),
            new FlowFieldGroupId(flow.fieldGroupId),
            new FlowData(flow.data),
            new FlowCreatedAt(flow.createdAt),
            new FlowUpdatedAt(flow.updatedAt),
            new FlowDeletedAt(flow.deletedAt),
              
        );
    }

    private makeResponse(flow: BplusItSappiFlow): FlowResponse
    {
        return new FlowResponse(
            flow.id.value,
            flow.tenantId.value,
            flow.tenantCode.value,
            flow.systemId.value,
            flow.systemName.value,
            flow.scenario.value,
            flow.party.value,
            flow.component.value,
            flow.interfaceName.value,
            flow.interfaceNamespace.value,
            flow.iflowName.value,
            flow.responsibleUserAccount.value,
            flow.lastChangeUserAccount.value,
            flow.lastChangedAt.value,
            flow.folderPath.value,
            flow.description.value,
            flow.application.value,
            flow.isCritical.value,
            flow.isComplex.value,
            flow.fieldGroupId.value,
            flow.data.value,
            flow.createdAt.value,
            flow.updatedAt.value,
            flow.deletedAt.value,
            
        );
    }
}