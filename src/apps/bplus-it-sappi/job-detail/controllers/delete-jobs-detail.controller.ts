import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDetailDto } from './../dto/job-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsDetailQuery } from '@hades/bplus-it-sappi/job-detail/application/get/get-jobs-detail.query';
import { DeleteJobsDetailCommand } from '@hades/bplus-it-sappi/job-detail/application/delete/delete-jobs-detail.command';

@ApiTags('[bplus-it-sappi] job-detail')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: JobDetailDto})
@Controller('bplus-it-sappi/jobs-detail')
export class DeleteJobsDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete jobs-detail in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const jobsDetail = await this.queryBus.ask(new GetJobsDetailQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteJobsDetailCommand(queryStatements));

        return jobsDetail;
    }
}