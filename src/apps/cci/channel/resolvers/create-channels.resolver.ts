import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateChannelInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateChannelsCommand } from '@hades/cci/channel/application/create/create-channels.command';

@Resolver()
export class CreateChannelsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateChannels')
    async main(@Args('payload') payload: CciCreateChannelInput[])
    {
        await this.commandBus.dispatch(new CreateChannelsCommand(payload));
        return true;
    }
}