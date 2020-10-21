import { Resolver, Query, Args } from '@nestjs/graphql';

// authorization
import { NotFoundException, UseGuards } from '@nestjs/common';
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
import { FindExecutionQuery } from '@hades/cci/execution/application/find/find-execution.query';
import { GetJobsDetailQuery } from '@hades/cci/job-detail/application/get/get-jobs-detail.query';
import { GetChannelsDetailQuery } from '@hades/cci/channel-detail/application/get/get-channels-detail.query';
import { GetMessagesDetailQuery } from '@hades/cci/message-detail/application/get/get-messages-detail.query';
import { FindSystemQuery } from '@hades/cci/system/application/find/find-system.query';

@Resolver()
@Permissions('cci.summary.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindSystemSummaryResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindSystemSummary')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('systemId') systemId: string, @Args('constraint') constraint?: QueryStatement, )
    {
        const system = await this.queryBus.ask(new FindSystemQuery({
            where: { 
                id: systemId,
                isActive: true,
                // TODO, filtar por campo de cancelled_at para evitar coger datos de sistemas cancelados?
            }, 
            order: [
                ['createdAt', 'DESC']
            ]
        }, constraint);

        if (!system) throw new NotFoundException(`System not found, maybe system is not active or cancelled`);

        // get last execution for this system, tenad add by contraint with TenantConstraint() decorator
        const execution = await this.queryBus.ask(new FindExecutionQuery({
            where: { 
                systemId: system.id
            }, 
            order: [
                ['createdAt', 'DESC']
            ]
        }, constraint));

        if (!execution) throw new NotFoundException(`Execution for this system not found`);
        
        // get details for jobs
        const jobsDetail = await this.queryBus.ask(new GetJobsDetailQuery({
            where: { 
                executionId: execution.id
            }
        }));

        // get details for channels
        const channelsDetail = await this.queryBus.ask(new GetChannelsDetailQuery({
            where: { 
                executionId: execution.id
            }
        }));

        // get details for messages
        const messagesDetail = await this.queryBus.ask(new GetMessagesDetailQuery({
            where: { 
                executionId: execution.id
            }
        }));

        return {
            execution,
            jobsDetail,
            channelsDetail,
            messagesDetail
        };
    }
}
