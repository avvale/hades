import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';
import { CreateRoleDto } from './../dto/create-role.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateRolesCommand } from '@hades/iam/role/application/create/create-roles.command';

@ApiTags('[iam] role')
@Controller('iam/roles')
@Permissions('iam.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateRolesController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create roles in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [RoleDto] })
    @ApiBody({ type: [CreateRoleDto] })
    async main(@Body() payload: CreateRoleDto[])
    {
        await this.commandBus.dispatch(new CreateRolesCommand(payload));
    }
}