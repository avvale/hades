import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateJobOverviewDto } from './../dto/update-job-overview.dto';
import { JobOverviewDto } from './../dto/job-overview.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateJobOverviewCommand } from '@hades/cci/job-overview/application/update/update-job-overview.command';
import { FindJobOverviewByIdQuery } from '@hades/cci/job-overview/application/find/find-job-overview-by-id.query';

@ApiTags('[cci] job-overview')
@Controller('cci/job-overview')
@Permissions('cci.jobOverview.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class UpdateJobOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update job-overview' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: JobOverviewDto})
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: UpdateJobOverviewDto, @Body('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateJobOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.cancelled,
            payload.completed,
            payload.error,
            constraint,
        ));

        return await this.queryBus.ask(new FindJobOverviewByIdQuery(payload.id, constraint));
    }
}