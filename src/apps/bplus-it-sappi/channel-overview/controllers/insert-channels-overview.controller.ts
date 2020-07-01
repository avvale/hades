import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateChannelOverviewDto } from './../dto/create-channel-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertChannelsOverviewCommand } from '@hades/bplus-it-sappi/channel-overview/application/insert/insert-channels-overview.command';

@ApiTags('[bplus-it-sappi] channel-overview')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('bplus-it-sappi/channels-overview')
export class InsertChannelsOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert channels-overview in batch' })
    @ApiBody({ 
        type: [CreateChannelOverviewDto]
    })
    async main(@Body() payload: CreateChannelOverviewDto[])
    {
        await this.commandBus.dispatch(new InsertChannelsOverviewCommand(payload));
    }
}