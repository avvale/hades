import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateRoleDto } from './../dto/create-role.dto';
import { RoleDto } from './../dto/role.dto';
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
import { FindRoleByIdQuery } from '@hades/cci/role/application/find/find-role-by-id.query';
import { CreateRoleCommand } from '@hades/cci/role/application/create/create-role.command';

@ApiTags('[cci] role')
@Controller('cci/role')
@Permissions('cci.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateRoleController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create role' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: RoleDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateRoleDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateRoleCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id, {}, { timezone }));
    }
}