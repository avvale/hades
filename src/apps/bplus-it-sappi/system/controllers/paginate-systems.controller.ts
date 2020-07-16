import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateSystemsQuery } from '@hades/bplus-it-sappi/system/application/paginate/paginate-systems.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';

@ApiTags('[bplus-it-sappi] system')
@Controller('bplus-it-sappi/systems/paginate')
export class PaginateSystemsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate systems' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatements', type: [QueryStatementInput] })
    @ApiQuery({ name: 'constraint', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateSystemsQuery(queryStatements, constraint));   
    }
}