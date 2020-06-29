import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDto } from './../dto/job.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsQuery } from '@hades/bplus-it-sappi/job/application/get/get-jobs.query';

@ApiTags('[bplus-it-sappi] job')
@ApiOkResponse({ description: 'The records has been found successfully.', type: JobDto})
@Controller('bplus-it-sappi/jobs')
export class GetJobsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find jobs according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetJobsQuery(queryStatements));   
    }
}