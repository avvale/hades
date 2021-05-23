import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateJobDetailDto } from './../dto/create-job-detail.dto';
import { JobDetailDto } from './../dto/job-detail.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
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
import { FindJobDetailByIdQuery } from '@hades/cci/job-detail/application/find/find-job-detail-by-id.query';
import { CreateJobDetailCommand } from '@hades/cci/job-detail/application/create/create-job-detail.command';

@ApiTags('[cci] job-detail')
@Controller('cci/job-detail')
@Permissions('cci.jobDetail.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateJobDetailController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create job-detail' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: JobDetailDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateJobDetailDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateJobDetailCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindJobDetailByIdQuery(payload.id, {}, { timezone }));
    }
}