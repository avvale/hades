import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { JobDetailDto } from './../dto/job-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetJobsDetailQuery } from '@hades/cci/job-detail/application/get/get-jobs-detail.query';
import { DeleteJobsDetailCommand } from '@hades/cci/job-detail/application/delete/delete-jobs-detail.command';

@ApiTags('[cci] job-detail')
@Controller('cci/jobs-detail')
export class DeleteJobsDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete jobs-detail in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [JobDetailDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const jobsDetail = await this.queryBus.ask(new GetJobsDetailQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteJobsDetailCommand(queryStatement));

        return jobsDetail;
    }
}