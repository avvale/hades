import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateRolesQuery } from '@hades/bplus-it-sappi/role/application/paginate/paginate-roles.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';

@ApiTags('[bplus-it-sappi] role')
@Controller('bplus-it-sappi/roles/paginate')
export class PaginateRolesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate roles' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatements', type: [QueryStatementInput] })
    @ApiQuery({ name: 'constraint', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateRolesQuery(queryStatements, constraint));   
    }
}