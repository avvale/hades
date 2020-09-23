import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateRolesQuery } from '@hades/iam/role/application/paginate/paginate-roles.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';

@ApiTags('[iam] role')
@Controller('iam/roles/paginate')
export class PaginateRolesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate roles' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement, @Body('constraint') constraint?: QueryStatement)
    {
        return await this.queryBus.ask(new PaginateRolesQuery(queryStatement, constraint));   
    }
}