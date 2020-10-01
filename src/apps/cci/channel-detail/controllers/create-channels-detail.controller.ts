import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ChannelDetailDto } from './../dto/channel-detail.dto';
import { CreateChannelDetailDto } from './../dto/create-channel-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateChannelsDetailCommand } from '@hades/cci/channel-detail/application/create/create-channels-detail.command';

@ApiTags('[cci] channel-detail')
@Controller('cci/channels-detail')
export class CreateChannelsDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channels-detail in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ChannelDetailDto] })
    @ApiBody({ type: [CreateChannelDetailDto] })
    async main(@Body() payload: CreateChannelDetailDto[])
    {
        await this.commandBus.dispatch(new CreateChannelsDetailCommand(payload));
    }
}