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
import { CreateJobsOverviewCommand } from '@hades/cci/job-overview/application/create/create-jobs-overview.command';
import { CciCreateJobOverviewInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.jobOverview.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateJobsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciCreateJobsOverview')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: CciCreateJobOverviewInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateJobsOverviewCommand(payload, { timezone }));
        return true;
    }
}