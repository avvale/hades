import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ChannelDetailDto } from './../dto/channel-detail.dto';
import { CreateChannelDetailDto } from './../dto/create-channel-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertChannelsDetailCommand } from '@hades/bplus-it-sappi/channel-detail/application/insert/insert-channels-detail.command';

@ApiTags('[bplus-it-sappi] channel-detail')
@Controller('bplus-it-sappi/channels-detail')
export class InsertChannelsDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert channels-detail in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ChannelDetailDto] })
    @ApiBody({ type: [CreateChannelDetailDto] })
    async main(@Body() payload: CreateChannelDetailDto[])
    {
        await this.commandBus.dispatch(new InsertChannelsDetailCommand(payload));
    }
}