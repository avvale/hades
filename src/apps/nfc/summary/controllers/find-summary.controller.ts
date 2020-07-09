import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SummaryDto } from './../dto/summary.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindSummaryQuery } from '@hades/nfc/summary/application/find/find-summary.query';

@ApiTags('[nfc] summary')
@Controller('nfc/summary')
export class FindSummaryController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find summary according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: SummaryDto })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindSummaryQuery(queryStatements));   
    }
}