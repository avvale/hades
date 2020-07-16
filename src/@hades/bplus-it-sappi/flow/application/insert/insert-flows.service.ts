import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    FlowCreatedAt, 
    FlowUpdatedAt, 
    FlowDeletedAt
    
} from './../../domain/value-objects';
import { IFlowRepository } from './../../domain/flow.repository';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';

@Injectable()
export class InsertFlowsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository
    ) {}

    public async main(
        flows: {
            id: FlowId,
            tenantId: FlowTenantId,
            systemId: FlowSystemId,
            systemName: FlowSystemName,
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
            flow.tenantId,
            flow.systemId,
            flow.systemName,
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
        await this.repository.insert(aggregateFlows);

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const flowsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id) // there may be cases where the database object is direct to the command, for example in the update, only one field can be updated
        // );
        // 
        // flowsRegistered.created(flows); // apply event to model events
        // flowsRegistered.commit(); // commit all events of model
    }
}