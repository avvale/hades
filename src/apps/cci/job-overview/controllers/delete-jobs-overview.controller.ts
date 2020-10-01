import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { JobOverviewDto } from './../dto/job-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetJobsOverviewQuery } from '@hades/cci/job-overview/application/get/get-jobs-overview.query';
import { DeleteJobsOverviewCommand } from '@hades/cci/job-overview/application/delete/delete-jobs-overview.command';

@ApiTags('[cci] job-overview')
@Controller('cci/jobs-overview')
export class DeleteJobsOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete jobs-overview in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [JobOverviewDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const jobsOverview = await this.queryBus.ask(new GetJobsOverviewQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteJobsOverviewCommand(queryStatement));

        return jobsOverview;
    }
}