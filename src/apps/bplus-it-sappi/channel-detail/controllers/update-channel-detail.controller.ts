import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateChannelDetailDto } from './../dto/update-channel-detail.dto';
import { ChannelDetailDto } from './../dto/channel-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateChannelDetailCommand } from '@hades/bplus-it-sappi/channel-detail/application/update/update-channel-detail.command';
import { FindChannelDetailByIdQuery } from '@hades/bplus-it-sappi/channel-detail/application/find/find-channel-detail-by-id.query';

@ApiTags('[bplus-it-sappi] channel-detail')
@Controller('bplus-it-sappi/channel-detail')
export class UpdateChannelDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update channel-detail' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ChannelDetailDto})
    async main(@Body() payload: UpdateChannelDetailDto)
    {
        await this.commandBus.dispatch(new UpdateChannelDetailCommand(
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
            payload.channelId,
            payload.channelSapId,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.detail,
            
        ));

        return await this.queryBus.ask(new FindChannelDetailByIdQuery(payload.id));
    }
}