import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateChannelOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateChannelOverviewCommand } from '@hades/cci/channel-overview/application/create/create-channel-overview.command';
import { FindChannelOverviewByIdQuery } from '@hades/cci/channel-overview/application/find/find-channel-overview-by-id.query';

@Resolver()
export class CreateChannelOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateChannelOverview')
    async main(@Args('payload') payload: CciCreateChannelOverviewInput)
    {
        await this.commandBus.dispatch(new CreateChannelOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.error,
            payload.inactive,
            payload.successful,
            payload.stopped,
            payload.unknown,
            payload.unregistered,
            
        ));
        
        return await this.queryBus.ask(new FindChannelOverviewByIdQuery(payload.id));
    }
}