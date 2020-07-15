import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateJobDetailDto } from './../dto/create-job-detail.dto';
import { JobDetailDto } from './../dto/job-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindJobDetailByIdQuery } from '@hades/bplus-it-sappi/job-detail/application/find/find-job-detail-by-id.query';
import { CreateJobDetailCommand } from '@hades/bplus-it-sappi/job-detail/application/create/create-job-detail.command';

@ApiTags('[bplus-it-sappi] job-detail')
@Controller('bplus-it-sappi/job-detail')
export class CreateJobDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create job-detail' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: JobDetailDto })
    async main(@Body() payload: CreateJobDetailDto)
    {
        await this.commandBus.dispatch(new CreateJobDetailCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.status,
            payload.name,
            payload.returnCode,
            payload.node,
            payload.user,
            
        ));

        return await this.queryBus.ask(new FindJobDetailByIdQuery(payload.id));
    }
}