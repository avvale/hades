import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateLangInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateCredentialsCommand } from '@hades/admin/lang/application/create/create-Credentials.command';

@Resolver()
export class CreateCredentialsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateCredentials')
    async main(@Args('payload') payload: AdminCreateLangInput[])
    {
        await this.commandBus.dispatch(new CreateCredentialsCommand(payload));
        return true;
    }
}