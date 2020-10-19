import { Resolver, Query, Args } from '@nestjs/graphql';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindMessageOverviewQuery } from '@hades/cci/message-overview/application/find/find-message-overview.query';
import { CciDashboard } from './../../../../graphql';

// custom
import { GetTenantsQuery } from '@hades/iam/tenant/application/get/get-tenants.query';
import { GetSystemsQuery } from '@hades/cci/system/application/get/get-systems.query';
import { GetJobsOverviewQuery } from '@hades/cci/job-overview/application/get/get-jobs-overview.query';
import { GetDashboardChannelsOverviewQuery } from '@hades/cci/channel-overview/application/get/get-dashboard-channels-overview.query';

@Resolver()
export class FindDashboardResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindDashboard')
    async main(@CurrentAccount() account: AccountResponse): Promise<CciDashboard>
    {
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

        /* await this.queryBus.ask(new GetJobsOverviewQuery({
            where: { 
                tenantId: account.dTenants,
                systemId: systems.map(system => system.id)
            },
            order: ['createdAt', 'DESC']
        })) */

        const channelsOverview = await this.queryBus.ask(new GetDashboardChannelsOverviewQuery({
            where: { 
                tenantId: account.dTenants,
                systemId: systems.map(system => system.id)
            }
        }));

        // const jobsOverview = await this.queryBus.ask(new GetDashboardJobsOverview)

        // const messagesOverview = await this.queryBus.ask(new Get)

       return null;
    }
}
