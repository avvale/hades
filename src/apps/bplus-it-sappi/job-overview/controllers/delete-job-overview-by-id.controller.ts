import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobOverviewDto } from './../dto/job-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobOverviewByIdQuery } from '@hades/bplus-it-sappi/job-overview/application/find/find-job-overview-by-id.query';
import { DeleteJobOverviewByIdCommand } from '@hades/bplus-it-sappi/job-overview/application/delete/delete-job-overview-by-id.command';

@ApiTags('[bplus-it-sappi] job-overview')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: JobOverviewDto})
@Controller('bplus-it-sappi/job-overview')
export class DeleteJobOverviewByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete job-overview by id' })
    async main(@Param('id') id: string)
    {
        const jobOverview = await this.queryBus.ask(new FindJobOverviewByIdQuery(id));

        await this.commandBus.dispatch(new DeleteJobOverviewByIdCommand(id));

        return jobOverview;
    }
}