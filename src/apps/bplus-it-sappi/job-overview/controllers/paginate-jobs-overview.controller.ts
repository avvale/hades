import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JobOverviewDto } from './../dto/job-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateJobsOverviewQuery } from '@hades/bplus-it-sappi/job-overview/application/paginate/paginate-jobs-overview.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';

@ApiTags('[bplus-it-sappi] job-overview')
@Controller('bplus-it-sappi/jobs-overview/paginate')
export class PaginateJobsOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate jobs-overview' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatements', type: [QueryStatementInput] })
    @ApiQuery({ name: 'constraint', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateJobsOverviewQuery(queryStatements, constraint));   
    }
}