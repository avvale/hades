import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeleteAccountsCommand } from '@hades/iam/account/application/delete/delete-accounts.command';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('iam.account.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteAccountsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteAccounts')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement)
    {
        const accounts = await this.queryBus.ask(new GetAccountsQuery(queryStatement, constraint));

        await this.commandBus.dispatch(new DeleteAccountsCommand(queryStatement, constraint));

        return accounts;
    }
}