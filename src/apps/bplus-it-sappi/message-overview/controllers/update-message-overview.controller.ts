import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateMessageOverviewDto } from './../dto/update-message-overview.dto';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateMessageOverviewCommand } from '@hades/bplus-it-sappi/message-overview/application/update/update-message-overview.command';
import { FindMessageOverviewByIdQuery } from '@hades/bplus-it-sappi/message-overview/application/find/find-message-overview-by-id.query';

@ApiTags('[bplus-it-sappi] message-overview')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: MessageOverviewDto})
@Controller('bplus-it-sappi/message-overview')
export class UpdateMessageOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update message-overview' })
    async main(@Body() payload: UpdateMessageOverviewDto)
    {
        await this.commandBus.dispatch(new UpdateMessageOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.numberMax,
            payload.numberDays,
            payload.success,
            payload.cancelled,
            payload.delivering,
            payload.error,
            payload.holding,
            payload.toBeDelivered,
            payload.waiting,
            
        ));

        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(payload.id));
    }
}