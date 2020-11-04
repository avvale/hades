import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDetailDto } from './../dto/job-detail.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

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
import { FindJobDetailByIdQuery } from '@hades/cci/job-detail/application/find/find-job-detail-by-id.query';
import { DeleteJobDetailByIdCommand } from '@hades/cci/job-detail/application/delete/delete-job-detail-by-id.command';

@ApiTags('[cci] job-detail')
@Controller('cci/job-detail')
@Permissions('cci.jobDetail.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteJobDetailByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete job-detail by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: JobDetailDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const jobDetail = await this.queryBus.ask(new FindJobDetailByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteJobDetailByIdCommand(id, constraint, { timezone }));

        return jobDetail;
    }
}