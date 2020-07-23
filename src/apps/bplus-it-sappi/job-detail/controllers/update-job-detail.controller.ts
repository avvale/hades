import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateJobDetailDto } from './../dto/update-job-detail.dto';
import { JobDetailDto } from './../dto/job-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateJobDetailCommand } from '@hades/bplus-it-sappi/job-detail/application/update/update-job-detail.command';
import { FindJobDetailByIdQuery } from '@hades/bplus-it-sappi/job-detail/application/find/find-job-detail-by-id.query';

@ApiTags('[bplus-it-sappi] job-detail')
@Controller('bplus-it-sappi/job-detail')
export class UpdateJobDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update job-detail' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: JobDetailDto})
    async main(@Body() payload: UpdateJobDetailDto)
    {
        await this.commandBus.dispatch(new UpdateJobDetailCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
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
            payload.startAt,
            payload.endAt,
            
        ));

        return await this.queryBus.ask(new FindJobDetailByIdQuery(payload.id));
    }
}