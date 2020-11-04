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
import { DeleteJobsOverviewCommand } from '@hades/cci/job-overview/application/delete/delete-jobs-overview.command';
import { GetJobsOverviewQuery } from '@hades/cci/job-overview/application/get/get-jobs-overview.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('cci.jobOverview.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteJobsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciDeleteJobsOverview')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const jobsOverview = await this.queryBus.ask(new GetJobsOverviewQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteJobsOverviewCommand(queryStatement, constraint, { timezone }));

        return jobsOverview;
    }
}