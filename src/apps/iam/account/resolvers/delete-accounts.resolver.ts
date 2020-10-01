import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { DeleteAccountsCommand } from '@hades/iam/account/application/delete/delete-accounts.command';

@Resolver()
export class DeleteAccountsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteAccounts')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const accounts = await this.queryBus.ask(new GetAccountsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteAccountsCommand(queryStatement));

        return accounts;
    }
}