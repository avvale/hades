import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { TenantPolicy } from '@hades/iam/shared/domain/decorators/tenant-policy.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateJobsDetailCommand } from '@hades/cci/job-detail/application/create/create-jobs-detail.command';
import { CciCreateJobDetailInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.jobDetail.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateJobsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciCreateJobsDetail')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: CciCreateJobDetailInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateJobsDetailCommand(payload, { timezone }));
        return true;
    }
}