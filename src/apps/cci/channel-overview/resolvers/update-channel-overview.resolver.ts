import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciUpdateChannelOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateChannelOverviewCommand } from '@hades/cci/channel-overview/application/update/update-channel-overview.command';
import { FindChannelOverviewByIdQuery } from '@hades/cci/channel-overview/application/find/find-channel-overview-by-id.query';

@Resolver()
export class UpdateChannelOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateChannelOverview')
    async main(@Args('payload') payload: CciUpdateChannelOverviewInput)
    {
        await this.commandBus.dispatch(new UpdateChannelOverviewCommand(
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