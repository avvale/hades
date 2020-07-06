import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';
import { 
    FlowId, 
    FlowTenantId, 
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
    FlowContactsIdId, 
    FlowCreatedAt, 
    FlowUpdatedAt, 
    FlowDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeFlowMapper implements SequelizeMapper
{
    mapToAggregate(flow: ObjectLiteral | ObjectLiteral[]): BplusItSappiFlow | BplusItSappiFlow[]
    {
        if (Array.isArray(flow))
        {
            return flow.map(item => BplusItSappiFlow.register(
                    new FlowId(item.id),
                    new FlowTenantId(item.tenantId),
                    new FlowSystemId(item.systemId),
                    new FlowSystemName(item.systemName),
                    new FlowScenario(item.scenario),
                    new FlowParty(item.party),
                    new FlowComponent(item.component),
                    new FlowInterfaceName(item.interfaceName),
                    new FlowInterfaceNamespace(item.interfaceNamespace),
                    new FlowIflowName(item.iflowName),
                    new FlowResponsibleUserAccount(item.responsibleUserAccount),
                    new FlowLastChangeUserAccount(item.lastChangeUserAccount),
                    new FlowLastChangedAt(item.lastChangedAt),
                    new FlowFolderPath(item.folderPath),
                    new FlowDescription(item.description),
                    new FlowApplication(item.application),
                    new FlowIsCritical(item.isCritical),
                    new FlowIsComplex(item.isComplex),
                    new FlowFieldGroupId(item.fieldGroupId),
                    new FlowData(item.data),
                    new FlowContactsIdId(item.contactsIdId),
                    new FlowCreatedAt(item.createdAt),
                    new FlowUpdatedAt(item.updatedAt),
                    new FlowDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return BplusItSappiFlow.register(
            new FlowId(flow.id),
            new FlowTenantId(flow.tenantId),
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
            new FlowContactsIdId(flow.contactsIdId),
            new FlowCreatedAt(flow.createdAt),
            new FlowUpdatedAt(flow.updatedAt),
            new FlowDeletedAt(flow.deletedAt),
            
        );
    }
}