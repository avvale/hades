import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreateAccountInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateAccountsCommand } from '@hades/iam/account/application/create/create-accounts.command';

@Resolver()
export class CreateAccountsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateAccounts')
    async main(@Args('payload') payload: IamCreateAccountInput[])
    {
        // await this.commandBus.dispatch(new CreateAccountsCommand(payload));
        return true;
    }
}