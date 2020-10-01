import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateChannelOverviewDto } from './../dto/update-channel-overview.dto';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateChannelOverviewCommand } from '@hades/cci/channel-overview/application/update/update-channel-overview.command';
import { FindChannelOverviewByIdQuery } from '@hades/cci/channel-overview/application/find/find-channel-overview-by-id.query';

@ApiTags('[cci] channel-overview')
@Controller('cci/channel-overview')
export class UpdateChannelOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update channel-overview' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ChannelOverviewDto})
    async main(@Body() payload: UpdateChannelOverviewDto)
    {
        await this.commandBus.dispatch(new UpdateChannelOverviewCommand(
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