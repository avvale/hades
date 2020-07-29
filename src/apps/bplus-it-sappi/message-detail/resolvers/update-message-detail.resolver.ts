import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateMessageDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateMessageDetailCommand } from '@hades/bplus-it-sappi/message-detail/application/update/update-message-detail.command';
import { FindMessageDetailByIdQuery } from '@hades/bplus-it-sappi/message-detail/application/find/find-message-detail-by-id.query';

@Resolver()
export class UpdateMessageDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateMessageDetail')
    async main(@Args('payload') payload: BplusItSappiUpdateMessageDetailInput)
    {
        await this.commandBus.dispatch(new UpdateMessageDetailCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.scenario,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.flowHash,
            payload.flowParty,
            payload.flowComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.status,
            payload.detail,
            payload.example,
            payload.startTimeAt,
            payload.direction,
            payload.errorCategory,
            payload.errorCode,
            payload.errorLabel,
            payload.node,
            payload.protocol,
            payload.qualityOfService,
            payload.receiverParty,
            payload.receiverComponent,
            payload.receiverInterface,
            payload.receiverInterfaceNamespace,
            payload.retries,
            payload.size,
            payload.timesFailed,
            
        ));
        
        return await this.queryBus.ask(new FindMessageDetailByIdQuery(payload.id));
    }
}