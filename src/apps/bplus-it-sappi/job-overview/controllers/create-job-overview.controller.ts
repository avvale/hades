import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateJobOverviewDto } from './../dto/create-job-overview.dto';
import { JobOverviewDto } from './../dto/job-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobOverviewByIdQuery } from '@hades/bplus-it-sappi/job-overview/application/find/find-job-overview-by-id.query';
import { CreateJobOverviewCommand } from '@hades/bplus-it-sappi/job-overview/application/create/create-job-overview.command';

@ApiTags('[bplus-it-sappi] job-overview')
@ApiCreatedResponse({ description: 'The record has been successfully created.', type: JobOverviewDto})
@Controller('bplus-it-sappi/job-overview')
export class CreateJobOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create job-overview' })
    async main(@Body() payload: CreateJobOverviewDto)
    {
        await this.commandBus.dispatch(new CreateJobOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
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