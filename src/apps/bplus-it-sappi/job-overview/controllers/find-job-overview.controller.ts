import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { JobOverviewDto } from './../dto/job-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindJobOverviewQuery } from '@hades/bplus-it-sappi/job-overview/application/find/find-job-overview.query';

@ApiTags('[bplus-it-sappi] job-overview')
@Controller('bplus-it-sappi/job-overview')
export class FindJobOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find job-overview according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: JobOverviewDto })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindJobOverviewQuery(queryStatements));   
    }
}