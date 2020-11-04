import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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
export class UpdateFlowService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository,
    ) {}

    public async main(
        payload: {
            id: FlowId,
            hash?: FlowHash,
            tenantId?: FlowTenantId,
            tenantCode?: FlowTenantCode,
            systemId?: FlowSystemId,
            systemName?: FlowSystemName,
            version?: FlowVersion,
            scenario?: FlowScenario,
            party?: FlowParty,
            receiverParty?: FlowReceiverParty,
            component?: FlowComponent,
            receiverComponent?: FlowReceiverComponent,
            interfaceName?: FlowInterfaceName,
            interfaceNamespace?: FlowInterfaceNamespace,
            iflowName?: FlowIflowName,
            responsibleUserAccount?: FlowResponsibleUserAccount,
            lastChangeUserAccount?: FlowLastChangeUserAccount,
            lastChangedAt?: FlowLastChangedAt,
            folderPath?: FlowFolderPath,
            description?: FlowDescription,
            application?: FlowApplication,
            isCritical?: FlowIsCritical,
            isComplex?: FlowIsComplex,
            fieldGroupId?: FlowFieldGroupId,
            data?: FlowData,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
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
            null,
            new FlowUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(flow, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const flowRegister = this.publisher.mergeObjectContext(
            flow
        );

        flowRegister.updated(flow); // apply event to model events
        flowRegister.commit(); // commit all events of model
    }
}