import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobOverviewDto } from './../dto/job-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsOverviewQuery } from '@hades/bplus-it-sappi/job-overview/application/get/get-jobs-overview.query';

@ApiTags('[bplus-it-sappi] job-overview')
@ApiOkResponse({ description: 'The records has been found successfully.', type: JobOverviewDto})
@Controller('bplus-it-sappi/jobs-overview')
export class GetJobsOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find jobs-overview according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetJobsOverviewQuery(queryStatements));   
    }
}