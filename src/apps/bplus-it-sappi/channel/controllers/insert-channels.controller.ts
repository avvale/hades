import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateChannelDto } from './../dto/create-channel.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertChannelsCommand } from '@hades/bplus-it-sappi/channel/application/insert/insert-channels.command';

@ApiTags('[bplus-it-sappi] channel')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('bplus-it-sappi/channels')
export class InsertChannelsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert channels in batch' })
    @ApiBody({ 
        type: [CreateChannelDto]
    })
    async main(@Body() payload: CreateChannelDto[])
    {
        await this.commandBus.dispatch(new InsertChannelsCommand(payload));
    }
}