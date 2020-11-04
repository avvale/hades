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
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateJobOverviewCommand } from '@hades/cci/job-overview/application/create/create-job-overview.command';
import { FindJobOverviewByIdQuery } from '@hades/cci/job-overview/application/find/find-job-overview-by-id.query';
import { CciCreateJobOverviewInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.jobOverview.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateJobOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciCreateJobOverview')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: CciCreateJobOverviewInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateJobOverviewCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindJobOverviewByIdQuery(payload.id, {}, { timezone }));
    }
}