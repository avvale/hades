import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';
import { CreateExecutionDto } from './../dto/create-execution.dto';
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
import { CreateExecutionsCommand } from '@hades/cci/execution/application/create/create-executions.command';

@ApiTags('[cci] execution')
@Controller('cci/executions')
@Permissions('cci.execution.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateExecutionsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create executions in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ExecutionDto] })
    @ApiBody({ type: [CreateExecutionDto] })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateExecutionDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateExecutionsCommand(payload, { timezone }));
    }
}