import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsQuery } from '@hades/bplus-it-sappi/channel/application/get/get-channels.query';
import { DeleteChannelsCommand } from '@hades/bplus-it-sappi/channel/application/delete/delete-channels.command';

@Resolver()
export class DeleteChannelsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteChannels')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const channels = await this.queryBus.ask(new GetChannelsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteChannelsCommand(queryStatements));

        return channels;
    }
}