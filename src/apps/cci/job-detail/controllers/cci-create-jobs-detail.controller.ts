import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JobDetailDto } from './../dto/job-detail.dto';
import { CreateJobDetailDto } from './../dto/create-job-detail.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateJobsDetailCommand } from '@hades/cci/job-detail/application/create/create-jobs-detail.command';

@ApiTags('[cci] job-detail')
@Controller('cci/jobs-detail')
@Permissions('cci.jobDetail.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateJobsDetailController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create jobs-detail in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [JobDetailDto] })
    @ApiBody({ type: [CreateJobDetailDto] })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateJobDetailDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateJobsDetailCommand(payload, { timezone }));
    }
}