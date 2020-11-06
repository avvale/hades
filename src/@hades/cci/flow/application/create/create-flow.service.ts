import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
    FlowDeletedAt,
} from './../../domain/value-objects';
import { IFlowRepository } from './../../domain/flow.repository';
import { CciFlow } from './../../domain/flow.aggregate';

@Injectable()
export class CreateFlowService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository,
    ) {}

    public async main(
        payload: {
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
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const flow = CciFlow.register(
            payload.id,
            payload.hash,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.version,
            payload.scenario,
            payload.party,
            payload.receiverParty,
            payload.component,
            payload.receiverComponent,
            payload.interfaceName,
            payload.interfaceNamespace,
            payload.iflowName,
            payload.responsibleUserAccount,
            payload.lastChangeUserAccount,
            payload.lastChangedAt,
            payload.folderPath,
            payload.description,
            payload.application,
            payload.isCritical,
            payload.isComplex,
            payload.fieldGroupId,
            payload.data,
            new FlowCreatedAt({currentTimestamp: true}),
            new FlowUpdatedAt({currentTimestamp: true}),
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