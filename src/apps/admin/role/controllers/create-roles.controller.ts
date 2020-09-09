import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';
import { CreateRoleDto } from './../dto/create-role.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateRolesCommand } from '@hades/admin/role/application/create/create-roles.command';

@ApiTags('[admin] role')
@Controller('admin/roles')
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