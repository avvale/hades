import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateChannelDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateChannelsDetailCommand } from '@hades/cci/channel-detail/application/create/create-channels-detail.command';

@Resolver()
export class CreateChannelsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateChannelsDetail')
    async main(@Args('payload') payload: CciCreateChannelDetailInput[])
    {
        await this.commandBus.dispatch(new CreateChannelsDetailCommand(payload));
        return true;
    }
}