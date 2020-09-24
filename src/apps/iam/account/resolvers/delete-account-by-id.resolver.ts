import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { DeleteAccountByIdCommand } from '@hades/iam/account/application/delete/delete-account-by-id.command';

@Resolver()
export class DeleteAccountByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteAccountById')
    async main(@Args('id') id: string)
    {
        const account = await this.queryBus.ask(new FindAccountByIdQuery(id));

        await this.commandBus.dispatch(new DeleteAccountByIdCommand(id));

        return account;
    }
}