import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetChannelsQuery } from '@hades/cci/channel/application/get/get-channels.query';
import { DeleteChannelsCommand } from '@hades/cci/channel/application/delete/delete-channels.command';

@Resolver()
export class DeleteChannelsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteChannels')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const channels = await this.queryBus.ask(new GetChannelsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteChannelsCommand(queryStatement));

        return channels;
    }
}