import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateJobDto } from './../dto/create-job.dto';
import { JobDto } from './../dto/job.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobByIdQuery } from '@hades/bplus-it-sappi/job/application/find/find-job-by-id.query';
import { CreateJobCommand } from '@hades/bplus-it-sappi/job/application/create/create-job.command';

@ApiTags('[bplus-it-sappi] job')
@ApiCreatedResponse({ description: 'The record has been successfully created.', type: JobDto})
@Controller('bplus-it-sappi/job')
export class CreateJobController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create job' })
    async main(@Body() payload: CreateJobDto)
    {
        await this.commandBus.dispatch(new CreateJobCommand(
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

        return await this.queryBus.ask(new FindJobByIdQuery(payload.id));
    }
}