import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';
import { DeleteClientByIdCommand } from '@hades/o-auth/client/application/delete/delete-client-by-id.command';

@Resolver()
export class DeleteClientByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteClientById')
    async main(@Args('id') id: string)
    {
        const client = await this.queryBus.ask(new FindClientByIdQuery(id));

        await this.commandBus.dispatch(new DeleteClientByIdCommand(id));

        return client;
    }
}