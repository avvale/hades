import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateClientInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateClientsCommand } from '@hades/o-auth/client/application/create/create-clients.command';

@Resolver()
export class CreateClientsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateClients')
    async main(@Args('payload') payload: OAuthCreateClientInput[])
    {
        await this.commandBus.dispatch(new CreateClientsCommand(payload));
        return true;
    }
}