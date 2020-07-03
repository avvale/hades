import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginatePermissionsQuery } from '@hades/admin/permission/application/paginate/paginate-permissions.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[admin] permission')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: PermissionDto})
@Controller('admin/permissions/paginate')
export class PaginatePermissionsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate permissions' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginatePermissionsQuery(queryStatements, constraint));   
    }
}