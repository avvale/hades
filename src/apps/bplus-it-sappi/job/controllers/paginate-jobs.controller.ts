import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDto } from './../dto/job.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateJobsQuery } from '@hades/bplus-it-sappi/job/application/paginate/paginate-jobs.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[bplus-it-sappi] job')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: JobDto})
@Controller('bplus-it-sappi/jobs/paginate')
export class PaginateJobsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate jobs' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateJobsQuery(queryStatements, constraint));   
    }
}