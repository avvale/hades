import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobOverviewDto } from './../dto/job-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsOverviewQuery } from '@hades/bplus-it-sappi/job-overview/application/get/get-jobs-overview.query';
import { DeleteJobsOverviewCommand } from '@hades/bplus-it-sappi/job-overview/application/delete/delete-jobs-overview.command';

@ApiTags('[bplus-it-sappi] job-overview')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: JobOverviewDto})
@Controller('bplus-it-sappi/jobs-overview')
export class DeleteJobsOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete jobs-overview in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const jobsOverview = await this.queryBus.ask(new GetJobsOverviewQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteJobsOverviewCommand(queryStatements));

        return jobsOverview;
    }
}