import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    FlowId, 
    FlowHash, 
    FlowTenantId, 
    FlowTenantCode, 
    FlowSystemId, 
    FlowSystemName, 
    FlowVersion, 
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
    
} from './../../domain/value-objects';
import { IFlowRepository } from './../../domain/flow.repository';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';
import { AddFlowsContextEvent } from './../events/add-flows-context.event';

@Injectable()
export class CreateFlowsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository
    ) {}

    public async main(
        flows: {
            id: FlowId,
            hash: FlowHash,
            tenantId: FlowTenantId,
            tenantCode: FlowTenantCode,
            systemId: FlowSystemId,
            systemName: FlowSystemName,
            version: FlowVersion,
            scenario: FlowScenario,
            party: FlowParty,
            component: FlowComponent,
            interfaceName: FlowInterfaceName,
            interfaceNamespace: FlowInterfaceNamespace,
            iflowName: FlowIflowName,
            responsibleUserAccount: FlowResponsibleUserAccount,
            lastChangeUserAccount: FlowLastChangeUserAccount,
            lastChangedAt: FlowLastChangedAt,
            folderPath: FlowFolderPath,
            description: FlowDescription,
            application: FlowApplication,
            isCritical: FlowIsCritical,
            isComplex: FlowIsComplex,
            fieldGroupId: FlowFieldGroupId,
            data: FlowData,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateFlows = flows.map(flow => BplusItSappiFlow.register(
            flow.id,
            flow.hash,
            flow.tenantId,
            flow.tenantCode,
            flow.systemId,
            flow.systemName,
            flow.version,
            flow.scenario,
            flow.party,
            flow.component,
            flow.interfaceName,
            flow.interfaceNamespace,
            flow.iflowName,
            flow.responsibleUserAccount,
            flow.lastChangeUserAccount,
            flow.lastChangedAt,
            flow.folderPath,
            flow.description,
            flow.application,
            flow.isCritical,
            flow.isComplex,
            flow.fieldGroupId,
            flow.data,
            new FlowCreatedAt(Utils.nowTimestamp()),
            new FlowUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateFlows, { updateOnDuplicate: ['version', 'scenario', 'iflowName'] });

        // create AddFlowsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const flowsRegistered = this.publisher.mergeObjectContext(new AddFlowsContextEvent(aggregateFlows));
 
        flowsRegistered.created(); // apply event to model events
        flowsRegistered.commit(); // commit all events of model
    }
}