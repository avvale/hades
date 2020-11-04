import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateJobDetailDto } from './../dto/update-job-detail.dto';
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
import { UpdateJobDetailCommand } from '@hades/cci/job-detail/application/update/update-job-detail.command';
import { FindJobDetailByIdQuery } from '@hades/cci/job-detail/application/find/find-job-detail-by-id.query';

@ApiTags('[cci] job-detail')
@Controller('cci/job-detail')
@Permissions('cci.jobDetail.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciUpdateJobDetailController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update job-detail' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: JobDetailDto})
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: UpdateJobDetailDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateJobDetailCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindJobDetailByIdQuery(payload.id, constraint, { timezone }));
    }
}