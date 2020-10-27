import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeleteMessagesOverviewCommand } from '@hades/cci/message-overview/application/delete/delete-messages-overview.command';
import { GetMessagesOverviewQuery } from '@hades/cci/message-overview/application/get/get-messages-overview.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('cci.messageOverview.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteMessagesOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteMessagesOverview')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, )
    {
        const messagesOverview = await this.queryBus.ask(new GetMessagesOverviewQuery(queryStatement, constraint));

        await this.commandBus.dispatch(new DeleteMessagesOverviewCommand(queryStatement, constraint));

        return messagesOverview;
    }
}