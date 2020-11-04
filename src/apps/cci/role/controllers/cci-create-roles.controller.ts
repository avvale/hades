import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';
import { CreateRoleDto } from './../dto/create-role.dto';
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
import { CreateRolesCommand } from '@hades/cci/role/application/create/create-roles.command';

@ApiTags('[cci] role')
@Controller('cci/roles')
@Permissions('cci.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateRolesController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create roles in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [RoleDto] })
    @ApiBody({ type: [CreateRoleDto] })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateRoleDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateRolesCommand(payload, { timezone }));
    }
}