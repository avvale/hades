import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateMessageDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateMessageDetailCommand } from '@hades/bplus-it-sappi/message-detail/application/create/create-message-detail.command';
import { FindMessageDetailByIdQuery } from '@hades/bplus-it-sappi/message-detail/application/find/find-message-detail-by-id.query';

@Resolver()
export class CreateMessageDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateMessageDetail')
    async main(@Args('payload') payload: BplusItSappiCreateMessageDetailInput)
    {
        await this.commandBus.dispatch(new CreateMessageDetailCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.scenario,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.flowId,
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