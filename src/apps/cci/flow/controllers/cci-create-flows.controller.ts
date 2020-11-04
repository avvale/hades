import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';
import { CreateFlowDto } from './../dto/create-flow.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateFlowsCommand } from '@hades/cci/flow/application/create/create-flows.command';

@ApiTags('[cci] flow')
@Controller('cci/flows')
@Permissions('cci.flow.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateFlowsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create flows in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [FlowDto] })
    @ApiBody({ type: [CreateFlowDto] })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateFlowDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateFlowsCommand(payload, { timezone }));
    }
}