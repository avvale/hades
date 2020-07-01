import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateMessageOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateMessageOverviewCommand } from '@hades/bplus-it-sappi/message-overview/application/update/update-message-overview.command';
import { FindMessageOverviewByIdQuery } from '@hades/bplus-it-sappi/message-overview/application/find/find-message-overview-by-id.query';

@Resolver()
export class UpdateMessageOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateMessageOverview')
    async main(@Args('payload') payload: BplusItSappiUpdateMessageOverviewInput)
    {
        await this.commandBus.dispatch(new UpdateMessageOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.numberMax,
            payload.numberDays,
            payload.success,
            payload.cancelled,
            payload.delivering,
            payload.error,
            payload.holding,
            payload.toBeDelivered,
            payload.waiting,
            
        ));
        
        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(payload.id));
    }
}