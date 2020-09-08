import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateCredentialInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateCredentialCommand } from '@hades/oauth/credential/application/create/create-credential.command';

@Resolver()
export class CreateCredentialResolver
{
    constructor(
        private readonly commandBus: ICommandBus
    ) {}

    @Mutation('oAuthCreateCredentials')
    async main(@Args('payload') payload: OAuthCreateCredentialInput)
    {
        await this.commandBus.dispatch(new CreateCredentialCommand(payload));
        return true;
    }
}