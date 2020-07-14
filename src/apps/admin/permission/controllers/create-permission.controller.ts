import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreatePermissionDto } from './../dto/create-permission.dto';
import { PermissionDto } from './../dto/permission.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindPermissionByIdQuery } from '@hades/admin/permission/application/find/find-permission-by-id.query';
import { CreatePermissionCommand } from '@hades/admin/permission/application/create/create-permission.command';

@ApiTags('[admin] permission')
@Controller('admin/permission')
export class CreatePermissionController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permission' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: PermissionDto})
    async main(@Body() payload: CreatePermissionDto)
    {
        await this.commandBus.dispatch(new CreatePermissionCommand(
            payload.id,
            payload.boundedContextId,
            payload.name,
            
        ));

        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id));
    }
}