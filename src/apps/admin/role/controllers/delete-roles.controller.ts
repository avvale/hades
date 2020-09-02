import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetRolesQuery } from '@hades/admin/role/application/get/get-roles.query';
import { DeleteRolesCommand } from '@hades/admin/role/application/delete/delete-roles.command';

@ApiTags('[admin] role')
@Controller('admin/roles')
export class DeleteRolesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete roles in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [RoleDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const roles = await this.queryBus.ask(new GetRolesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteRolesCommand(queryStatements));

        return roles;
    }
}