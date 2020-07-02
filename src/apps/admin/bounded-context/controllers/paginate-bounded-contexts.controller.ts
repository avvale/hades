import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateBoundedContextsQuery } from '@hades/admin/bounded-context/application/paginate/paginate-bounded-contexts.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[admin] bounded-context')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: BoundedContextDto})
@Controller('admin/bounded-contexts/paginate')
export class PaginateBoundedContextsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate bounded-contexts' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateBoundedContextsQuery(queryStatements, constraint));   
    }
}