import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateChannelDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateChannelDetailCommand } from '@hades/cci/channel-detail/application/create/create-channel-detail.command';
import { FindChannelDetailByIdQuery } from '@hades/cci/channel-detail/application/find/find-channel-detail-by-id.query';

@Resolver()
export class CreateChannelDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateChannelDetail')
    async main(@Args('payload') payload: CciCreateChannelDetailInput)
    {
        await this.commandBus.dispatch(new CreateChannelDetailCommand(
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
            payload.channelHash,
            payload.channelSapId,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.detail,
            
        ));
        
        return await this.queryBus.ask(new FindChannelDetailByIdQuery(payload.id));
    }
}