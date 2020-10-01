import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetClientsQuery } from '@hades/o-auth/client/application/get/get-clients.query';
import { DeleteClientsCommand } from '@hades/o-auth/client/application/delete/delete-clients.command';

@Resolver()
export class DeleteClientsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteClients')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const clients = await this.queryBus.ask(new GetClientsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteClientsCommand(queryStatement));

        return clients;
    }
}