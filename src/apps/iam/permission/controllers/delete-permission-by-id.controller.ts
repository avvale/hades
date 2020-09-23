import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindPermissionByIdQuery } from '@hades/iam/permission/application/find/find-permission-by-id.query';
import { DeletePermissionByIdCommand } from '@hades/iam/permission/application/delete/delete-permission-by-id.command';

@ApiTags('[iam] permission')
@Controller('iam/permission')
export class DeletePermissionByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete permission by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: PermissionDto })
    async main(@Param('id') id: string)
    {
        const permission = await this.queryBus.ask(new FindPermissionByIdQuery(id));

        await this.commandBus.dispatch(new DeletePermissionByIdCommand(id));

        return permission;
    }
}