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
export class CreateFlowService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository
    ) {}

    public async main(
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
        
    ): Promise<void>
    {
        // create object with factory pattern
        const flow = BplusItSappiFlow.register(
            id,
            tenantId,
            systemId,
            systemName,
            scenario,
            party,
            component,
            interfaceName,
            interfaceNamespace,
            iflowName,
            responsibleUserAccount,
            lastChangeUserAccount,
            lastChangedAt,
            folderPath,
            description,
            application,
            isCritical,
            isComplex,
            fieldGroupId,
            data,
            new FlowCreatedAt(Utils.nowTimestamp()),
            new FlowUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(flow);

        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const flowRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        flowRegister.created(flow); // apply event to model events
        flowRegister.commit(); // commit all events of model
    }
}