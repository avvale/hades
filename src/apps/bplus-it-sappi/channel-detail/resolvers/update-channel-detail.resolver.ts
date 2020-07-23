import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateChannelDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateChannelDetailCommand } from '@hades/bplus-it-sappi/channel-detail/application/update/update-channel-detail.command';
import { FindChannelDetailByIdQuery } from '@hades/bplus-it-sappi/channel-detail/application/find/find-channel-detail-by-id.query';

@Resolver()
export class UpdateChannelDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateChannelDetail')
    async main(@Args('payload') payload: BplusItSappiUpdateChannelDetailInput)
    {
        await this.commandBus.dispatch(new UpdateChannelDetailCommand(
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
            payload.status,
            payload.channelId,
            payload.channelSapId,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.detail,
            
        ));
        
        return await this.queryBus.ask(new FindChannelDetailByIdQuery(payload.id));
    }
}