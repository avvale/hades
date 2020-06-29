import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateJobDto } from './../dto/update-job.dto';
import { JobDto } from './../dto/job.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateJobCommand } from '@hades/bplus-it-sappi/job/application/update/update-job.command';
import { FindJobByIdQuery } from '@hades/bplus-it-sappi/job/application/find/find-job-by-id.query';

@ApiTags('[bplus-it-sappi] job')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: JobDto})
@Controller('bplus-it-sappi/job')
export class UpdateJobController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update job' })
    async main(@Body() payload: UpdateJobDto)
    {
        await this.commandBus.dispatch(new UpdateJobCommand(
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