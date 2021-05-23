import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateExecutionDto } from './../dto/create-execution.dto';
import { ExecutionDto } from './../dto/execution.dto';
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
import { FindExecutionByIdQuery } from '@hades/cci/execution/application/find/find-execution-by-id.query';
import { CreateExecutionCommand } from '@hades/cci/execution/application/create/create-execution.command';

@ApiTags('[cci] execution')
@Controller('cci/execution')
@Permissions('cci.execution.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateExecutionController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create execution' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ExecutionDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateExecutionDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateExecutionCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindExecutionByIdQuery(payload.id, {}, { timezone }));
    }
}