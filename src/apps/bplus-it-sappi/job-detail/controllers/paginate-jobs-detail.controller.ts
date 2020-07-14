import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDetailDto } from './../dto/job-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateJobsDetailQuery } from '@hades/bplus-it-sappi/job-detail/application/paginate/paginate-jobs-detail.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[bplus-it-sappi] job-detail')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: JobDetailDto})
@Controller('bplus-it-sappi/jobs-detail/paginate')
export class PaginateJobsDetailController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate jobs-detail' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateJobsDetailQuery(queryStatements, constraint));   
    }
}