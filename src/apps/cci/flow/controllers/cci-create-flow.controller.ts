import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateFlowDto } from './../dto/create-flow.dto';
import { FlowDto } from './../dto/flow.dto';
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
import { FindFlowByIdQuery } from '@hades/cci/flow/application/find/find-flow-by-id.query';
import { CreateFlowCommand } from '@hades/cci/flow/application/create/create-flow.command';

@ApiTags('[cci] flow')
@Controller('cci/flow')
@Permissions('cci.flow.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateFlowController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create flow' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: FlowDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateFlowDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateFlowCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindFlowByIdQuery(payload.id, {}, { timezone }));
    }
}