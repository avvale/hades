import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';
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
import { FindFlowByIdQuery } from '@hades/cci/flow/application/find/find-flow-by-id.query';
import { DeleteFlowByIdCommand } from '@hades/cci/flow/application/delete/delete-flow-by-id.command';

@ApiTags('[cci] flow')
@Controller('cci/flow')
@Permissions('cci.flow.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteFlowByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete flow by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: FlowDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const flow = await this.queryBus.ask(new FindFlowByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteFlowByIdCommand(id, constraint, { timezone }));

        return flow;
    }
}