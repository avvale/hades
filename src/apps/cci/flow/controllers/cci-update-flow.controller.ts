import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateFlowDto } from './../dto/update-flow.dto';
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
import { UpdateFlowCommand } from '@hades/cci/flow/application/update/update-flow.command';
import { FindFlowByIdQuery } from '@hades/cci/flow/application/find/find-flow-by-id.query';

@ApiTags('[cci] flow')
@Controller('cci/flow')
@Permissions('cci.flow.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciUpdateFlowController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update flow' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: FlowDto})
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: UpdateFlowDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateFlowCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindFlowByIdQuery(payload.id, constraint, { timezone }));
    }
}