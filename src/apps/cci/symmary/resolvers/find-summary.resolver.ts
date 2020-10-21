import { Resolver, Query, Args } from '@nestjs/graphql';

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
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';

// custom
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetTenantsQuery } from '@hades/iam/tenant/application/get/get-tenants.query';
import { GetSystemsQuery } from '@hades/cci/system/application/get/get-systems.query';
import { GetDashboardChannelsOverviewQuery } from '@hades/cci/channel-overview/application/get/get-dashboard-channels-overview.query';
import { GetDashboardJobsOverviewQuery } from '@hades/cci/job-overview/application/get/get-dashboard-jobs-overview.query';
import { GetDashboardMessagesOverviewQuery } from '@hades/cci/message-overview/application/get/get-dashboard-messages-overview.query';
import { FindExecutionQuery } from '@hades/cci/execution/application/find/find-execution.query';

@Resolver()
@Permissions('cci.dashboard.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindSummaryResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindSummary')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, )
    {

        const execution = await this.queryBus.ask(new FindExecutionQuery({
            where: { 
                id: account.dTenants
            }
        }, constraint));

        // get tenanat fot this account
        const tenants = await this.queryBus.ask(new GetTenantsQuery({
            where: { 
                id: account.dTenants
            }
        }));

        // get systems for this tenants
        const systems = await this.queryBus.ask(new GetSystemsQuery({
            where: { 
                tenantId: account.dTenants
            }
        }));

        const jobsOverview = await this.queryBus.ask(new GetDashboardJobsOverviewQuery({
            where: { 
                tenantId: account.dTenants,
                systemId: systems.map(system => system.id)
            }
        }));

        const channelsOverview = await this.queryBus.ask(new GetDashboardChannelsOverviewQuery({
            where: { 
                tenantId: account.dTenants,
                systemId: systems.map(system => system.id)
            }
        }));

        const messagesOverview = await this.queryBus.ask(new GetDashboardMessagesOverviewQuery({
            where: { 
                tenantId: account.dTenants,
                systemId: systems.map(system => system.id)
            }
        }));

        return {
            tenants,
            systems,
            jobsOverview,
            channelsOverview,
            messagesOverview
        };
    }
}
