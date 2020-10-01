import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetChannelsDetailQuery } from '@hades/cci/channel-detail/application/get/get-channels-detail.query';
import { DeleteChannelsDetailCommand } from '@hades/cci/channel-detail/application/delete/delete-channels-detail.command';

@Resolver()
export class DeleteChannelsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteChannelsDetail')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const channelsDetail = await this.queryBus.ask(new GetChannelsDetailQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteChannelsDetailCommand(queryStatement));

        return channelsDetail;
    }
}