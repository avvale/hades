import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';
import { CreateSystemDto } from './../dto/create-system.dto';
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
import { CreateSystemsCommand } from '@hades/cci/system/application/create/create-systems.command';

@ApiTags('[cci] system')
@Controller('cci/systems')
@Permissions('cci.system.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateSystemsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create systems in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [SystemDto] })
    @ApiBody({ type: [CreateSystemDto] })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateSystemDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateSystemsCommand(payload, { timezone }));
    }
}