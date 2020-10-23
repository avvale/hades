import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JobOverviewDto } from './../dto/job-overview.dto';
import { CreateJobOverviewDto } from './../dto/create-job-overview.dto';

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
import { CreateJobsOverviewCommand } from '@hades/cci/job-overview/application/create/create-jobs-overview.command';

@ApiTags('[cci] job-overview')
@Controller('cci/jobs-overview')
@Permissions('cci.jobOverview.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateJobsOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create jobs-overview in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [JobOverviewDto] })
    @ApiBody({ type: [CreateJobOverviewDto] })
    @TenantPolicy()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: CreateJobOverviewDto[], )
    {
        await this.commandBus.dispatch(new CreateJobsOverviewCommand(payload));
    }
}