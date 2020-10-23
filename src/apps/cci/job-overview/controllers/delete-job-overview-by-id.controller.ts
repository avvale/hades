import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
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
import { FindJobOverviewByIdQuery } from '@hades/cci/job-overview/application/find/find-job-overview-by-id.query';
import { DeleteJobOverviewByIdCommand } from '@hades/cci/job-overview/application/delete/delete-job-overview-by-id.command';

@ApiTags('[cci] job-overview')
@Controller('cci/job-overview')
@Permissions('cci.jobOverview.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteJobOverviewByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete job-overview by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: JobOverviewDto })
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Param('id') id: string, @Body('constraint') constraint?: QueryStatement, )
    {
        const jobOverview = await this.queryBus.ask(new FindJobOverviewByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteJobOverviewByIdCommand(id, constraint));

        return jobOverview;
    }
}