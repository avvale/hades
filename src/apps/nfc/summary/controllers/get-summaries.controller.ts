import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SummaryDto } from './../dto/summary.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSummariesQuery } from '@hades/nfc/summary/application/get/get-summaries.query';

@ApiTags('[nfc] summary')
@Controller('nfc/summaries')
export class GetSummariesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find summaries according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [SummaryDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetSummariesQuery(queryStatements));   
    }
}