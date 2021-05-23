import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { TenantConstraint } from '@hades/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindExecutionByIdQuery } from '@hades/cci/execution/application/find/find-execution-by-id.query';

@ApiTags('[cci] execution')
@Controller('cci/execution')
@Permissions('cci.execution.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciFindExecutionByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find execution by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ExecutionDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindExecutionByIdQuery(id, constraint, { timezone }));
    }
}