import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelDetailByIdQuery } from '@hades/bplus-it-sappi/channel-detail/application/find/find-channel-detail-by-id.query';
import { DeleteChannelDetailByIdCommand } from '@hades/bplus-it-sappi/channel-detail/application/delete/delete-channel-detail-by-id.command';

@Resolver()
export class DeleteChannelDetailByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteChannelDetailById')
    async main(@Args('id') id: string)
    {
        const channelDetail = await this.queryBus.ask(new FindChannelDetailByIdQuery(id));

        await this.commandBus.dispatch(new DeleteChannelDetailByIdCommand(id));

        return channelDetail;
    }
}