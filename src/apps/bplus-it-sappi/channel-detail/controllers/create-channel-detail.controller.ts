import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateChannelDetailDto } from './../dto/create-channel-detail.dto';
import { ChannelDetailDto } from './../dto/channel-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelDetailByIdQuery } from '@hades/bplus-it-sappi/channel-detail/application/find/find-channel-detail-by-id.query';
import { CreateChannelDetailCommand } from '@hades/bplus-it-sappi/channel-detail/application/create/create-channel-detail.command';

@ApiTags('[bplus-it-sappi] channel-detail')
@Controller('bplus-it-sappi/channel-detail')
export class CreateChannelDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channel-detail' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ChannelDetailDto })
    async main(@Body() payload: CreateChannelDetailDto)
    {
        await this.commandBus.dispatch(new CreateChannelDetailCommand(
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