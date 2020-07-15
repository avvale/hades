import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsDetailQuery } from '@hades/bplus-it-sappi/channel-detail/application/get/get-channels-detail.query';
import { DeleteChannelsDetailCommand } from '@hades/bplus-it-sappi/channel-detail/application/delete/delete-channels-detail.command';

@Resolver()
export class DeleteChannelsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteChannelsDetail')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const channelsDetail = await this.queryBus.ask(new GetChannelsDetailQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteChannelsDetailCommand(queryStatements));

        return channelsDetail;
    }
}