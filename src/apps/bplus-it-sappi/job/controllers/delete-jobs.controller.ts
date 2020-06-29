import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDto } from './../dto/job.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsQuery } from '@hades/bplus-it-sappi/job/application/get/get-jobs.query';
import { DeleteJobsCommand } from '@hades/bplus-it-sappi/job/application/delete/delete-jobs.command';

@ApiTags('[bplus-it-sappi] job')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: JobDto})
@Controller('bplus-it-sappi/jobs')
export class DeleteJobsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete jobs in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const jobs = await this.queryBus.ask(new GetJobsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteJobsCommand(queryStatements));

        return jobs;
    }
}