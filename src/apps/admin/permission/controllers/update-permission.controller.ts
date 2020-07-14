import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UpdatePermissionDto } from './../dto/update-permission.dto';
import { PermissionDto } from './../dto/permission.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdatePermissionCommand } from '@hades/admin/permission/application/update/update-permission.command';
import { FindPermissionByIdQuery } from '@hades/admin/permission/application/find/find-permission-by-id.query';

@ApiTags('[admin] permission')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: PermissionDto})
@Controller('admin/permission')
export class UpdatePermissionController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update permission' })
    async main(@Body() payload: UpdatePermissionDto)
    {
        await this.commandBus.dispatch(new UpdatePermissionCommand(
            payload.id,
            payload.boundedContextId,
            payload.name,
            
        ));

        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id));
    }
}