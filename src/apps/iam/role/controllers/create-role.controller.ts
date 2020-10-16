import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateRoleDto } from './../dto/create-role.dto';
import { RoleDto } from './../dto/role.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';
import { CreateRoleCommand } from '@hades/iam/role/application/create/create-role.command';

@ApiTags('[iam] role')
@Controller('iam/role')
@Permissions('iam.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateRoleController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create role' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: RoleDto })
    async main(@Body() payload: CreateRoleDto)
    {
        await this.commandBus.dispatch(new CreateRoleCommand(
            payload.id,
            payload.name,
            payload.isMaster,
            payload.permissionIds,
            payload.accountIds,
            
        ));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }
}