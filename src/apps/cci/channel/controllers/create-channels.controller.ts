import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';
import { CreateChannelDto } from './../dto/create-channel.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateChannelsCommand } from '@hades/cci/channel/application/create/create-channels.command';

@ApiTags('[cci] channel')
@Controller('cci/channels')
export class CreateChannelsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channels in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ChannelDto] })
    @ApiBody({ type: [CreateChannelDto] })
    async main(@Body() payload: CreateChannelDto[])
    {
        await this.commandBus.dispatch(new CreateChannelsCommand(payload));
    }
}