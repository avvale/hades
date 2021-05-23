import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';
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
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetFlowsQuery } from '@hades/cci/flow/application/get/get-flows.query';
import { DeleteFlowsCommand } from '@hades/cci/flow/application/delete/delete-flows.command';

@ApiTags('[cci] flow')
@Controller('cci/flows')
@Permissions('cci.flow.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteFlowsController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete flows in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [FlowDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const flows = await this.queryBus.ask(new GetFlowsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteFlowsCommand(queryStatement, constraint, { timezone }));

        return flows;
    }
}