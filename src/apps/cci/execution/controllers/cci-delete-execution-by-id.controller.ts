import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';

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
import { FindExecutionByIdQuery } from '@hades/cci/execution/application/find/find-execution-by-id.query';
import { DeleteExecutionByIdCommand } from '@hades/cci/execution/application/delete/delete-execution-by-id.command';

@ApiTags('[cci] execution')
@Controller('cci/execution')
@Permissions('cci.execution.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteExecutionByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete execution by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ExecutionDto })
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Param('id') id: string, @Body('constraint') constraint?: QueryStatement)
    {
        const execution = await this.queryBus.ask(new FindExecutionByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteExecutionByIdCommand(id, constraint));

        return execution;
    }
}