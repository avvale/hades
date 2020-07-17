import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';
import { CreatePermissionDto } from './../dto/create-permission.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertPermissionsCommand } from '@hades/admin/permission/application/insert/insert-permissions.command';

@ApiTags('[admin] permission')
@Controller('admin/permissions')
export class InsertPermissionsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert permissions in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [PermissionDto] })
    @ApiBody({ type: [CreatePermissionDto] })
    async main(@Body() payload: CreatePermissionDto[])
    {
        await this.commandBus.dispatch(new InsertPermissionsCommand(payload));
    }
}