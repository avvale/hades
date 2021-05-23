import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { TenantConstraint } from '@hades/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeleteChannelsOverviewCommand } from '@hades/cci/channel-overview/application/delete/delete-channels-overview.command';
import { GetChannelsOverviewQuery } from '@hades/cci/channel-overview/application/get/get-channels-overview.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('cci.channelOverview.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteChannelsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciDeleteChannelsOverview')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const channelsOverview = await this.queryBus.ask(new GetChannelsOverviewQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteChannelsOverviewCommand(queryStatement, constraint, { timezone }));

        return channelsOverview;
    }
}