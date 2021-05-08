import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { TenantDto } from './../dto/tenant.dto';
import { CreateTenantDto } from './../dto/create-tenant.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateTenantsCommand } from '@hades/iam/tenant/application/create/create-tenants.command';

@ApiTags('[iam] tenant')
@Controller('iam/tenants')
@Permissions('iam.tenant.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateTenantsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tenants in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [TenantDto] })
    @ApiBody({ type: [CreateTenantDto] })
    async main(
        @Body() payload: CreateTenantDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateTenantsCommand(payload, { timezone }));
    }
}