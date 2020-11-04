import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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
    ModuleDeletedAt,
} from './../../domain/value-objects';
import { IModuleRepository } from './../../domain/module.repository';
import { CciModule } from './../../domain/module.aggregate';

@Injectable()
export class UpdateModuleService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IModuleRepository,
    ) {}

    public async main(
        payload: {
            id: ModuleId,
            tenantId?: ModuleTenantId,
            tenantCode?: ModuleTenantCode,
            systemId?: ModuleSystemId,
            systemName?: ModuleSystemName,
            channelHash?: ModuleChannelHash,
            channelParty?: ModuleChannelParty,
            channelComponent?: ModuleChannelComponent,
            channelName?: ModuleChannelName,
            flowHash?: ModuleFlowHash,
            flowParty?: ModuleFlowParty,
            flowReceiverParty?: ModuleFlowReceiverParty,
            flowComponent?: ModuleFlowComponent,
            flowReceiverComponent?: ModuleFlowReceiverComponent,
            flowInterfaceName?: ModuleFlowInterfaceName,
            flowInterfaceNamespace?: ModuleFlowInterfaceNamespace,
            version?: ModuleVersion,
            parameterGroup?: ModuleParameterGroup,
            name?: ModuleName,
            parameterName?: ModuleParameterName,
            parameterValue?: ModuleParameterValue,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const module = CciModule.register(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.channelHash,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.flowHash,
            payload.flowParty,
            payload.flowReceiverParty,
            payload.flowComponent,
            payload.flowReceiverComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.version,
            payload.parameterGroup,
            payload.name,
            payload.parameterName,
            payload.parameterValue,
            null,
            new ModuleUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(module, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const moduleRegister = this.publisher.mergeObjectContext(
            module
        );

        moduleRegister.updated(module); // apply event to model events
        moduleRegister.commit(); // commit all events of model
    }
}