import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateJobOverviewDto } from './../dto/update-job-overview.dto';
import { JobOverviewDto } from './../dto/job-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateJobOverviewCommand } from '@hades/bplus-it-sappi/job-overview/application/update/update-job-overview.command';
import { FindJobOverviewByIdQuery } from '@hades/bplus-it-sappi/job-overview/application/find/find-job-overview-by-id.query';

@ApiTags('[bplus-it-sappi] job-overview')
@Controller('bplus-it-sappi/job-overview')
export class UpdateJobOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update job-overview' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: JobOverviewDto})
    async main(@Body() payload: UpdateJobOverviewDto)
    {
        await this.commandBus.dispatch(new UpdateJobOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.cancelled,
            payload.completed,
            payload.error,
            
        ));

        return await this.queryBus.ask(new FindJobOverviewByIdQuery(payload.id));
    }
}