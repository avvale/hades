import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateChannelOverviewDto } from './../dto/update-channel-overview.dto';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateChannelOverviewCommand } from '@hades/bplus-it-sappi/channel-overview/application/update/update-channel-overview.command';
import { FindChannelOverviewByIdQuery } from '@hades/bplus-it-sappi/channel-overview/application/find/find-channel-overview-by-id.query';

@ApiTags('[bplus-it-sappi] channel-overview')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: ChannelOverviewDto})
@Controller('bplus-it-sappi/channel-overview')
export class UpdateChannelOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update channel-overview' })
    async main(@Body() payload: UpdateChannelOverviewDto)
    {
        await this.commandBus.dispatch(new UpdateChannelOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.error,
            payload.inactive,
            payload.successful,
            payload.stopped,
            payload.unknown,
            payload.unregistered,
            
        ));

        return await this.queryBus.ask(new FindChannelOverviewByIdQuery(payload.id));
    }
}