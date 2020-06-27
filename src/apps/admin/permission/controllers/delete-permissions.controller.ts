import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetPermissionsQuery } from '@hades/admin/permission/application/get/get-permissions.query';
import { DeletePermissionsCommand } from '@hades/admin/permission/application/delete/delete-permissions.command';

@ApiTags('[admin] permission')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: PermissionDto})
@Controller('admin/permissions')
export class DeletePermissionsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete permissions in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const permissions = await this.queryBus.ask(new GetPermissionsQuery(queryStatements));

        await this.commandBus.dispatch(new DeletePermissionsCommand(queryStatements));

        return permissions;
    }
}