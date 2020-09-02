import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateRoleDto } from './../dto/create-role.dto';
import { RoleDto } from './../dto/role.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRoleByIdQuery } from '@hades/admin/role/application/find/find-role-by-id.query';
import { CreateRoleCommand } from '@hades/admin/role/application/create/create-role.command';

@ApiTags('[admin] role')
@Controller('admin/role')
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
            
        ));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }
}