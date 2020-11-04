import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

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
import { FindMessageOverviewByIdQuery } from '@hades/cci/message-overview/application/find/find-message-overview-by-id.query';
import { DeleteMessageOverviewByIdCommand } from '@hades/cci/message-overview/application/delete/delete-message-overview-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('cci.messageOverview.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteMessageOverviewByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciDeleteMessageOverviewById')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const messageOverview = await this.queryBus.ask(new FindMessageOverviewByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteMessageOverviewByIdCommand(id, constraint, { timezone }));

        return messageOverview;
    }
}