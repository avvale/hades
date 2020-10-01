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
    FlowReceiverParty,
    FlowComponent,
    FlowReceiverComponent,
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
import { CciFlow } from './../../domain/flow.aggregate';

@Injectable()
export class CreateFlowService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository
    ) {}

    public async main(
        id: FlowId,
        hash: FlowHash,
        tenantId: FlowTenantId,
        tenantCode: FlowTenantCode,
        systemId: FlowSystemId,
        systemName: FlowSystemName,
        version: FlowVersion,
        scenario: FlowScenario,
        party: FlowParty,
        receiverParty: FlowReceiverParty,
        component: FlowComponent,
        receiverComponent: FlowReceiverComponent,
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
        // create aggregate with factory pattern
        const flow = CciFlow.register(
            id,
            hash,
            tenantId,
            tenantCode,
            systemId,
            systemName,
            version,
            scenario,
            party,
            receiverParty,
            component,
            receiverComponent,
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

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const flowRegister = this.publisher.mergeObjectContext(
            flow
        );
        
        flowRegister.created(flow); // apply event to model events
        flowRegister.commit(); // commit all events of model
    }
}