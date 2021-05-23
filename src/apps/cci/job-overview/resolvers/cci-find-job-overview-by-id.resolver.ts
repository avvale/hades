import { Resolver, Args, Query } from '@nestjs/graphql';
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
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindJobOverviewByIdQuery } from '@hades/cci/job-overview/application/find/find-job-overview-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CciJobOverview } from './../../../../graphql';

@Resolver()
@Permissions('cci.jobOverview.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciFindJobOverviewByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('cciFindJobOverviewById')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CciJobOverview>
    {
        return await this.queryBus.ask(new FindJobOverviewByIdQuery(id, constraint, { timezone }));
    }
}