import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { LangDto } from './../dto/lang.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindLangQuery } from '@hades/admin/lang/application/find/find-lang.query';

@ApiTags('[admin] lang')
@Controller('admin/lang')
export class FindLangController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find lang according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: LangDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new FindLangQuery(queryStatement));   
    }
}