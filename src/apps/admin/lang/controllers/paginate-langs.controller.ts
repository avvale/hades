import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LangDto } from './../dto/lang.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateLangsQuery } from '@hades/admin/lang/application/paginate/paginate-langs.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';

@ApiTags('[admin] lang')
@Controller('admin/langs/paginate')
export class PaginateLangsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate langs' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement, @Body('constraint') constraint?: QueryStatement)
    {
        return await this.queryBus.ask(new PaginateLangsQuery(queryStatement, constraint));   
    }
}