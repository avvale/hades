import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';
import { CreateChannelOverviewDto } from './../dto/create-channel-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateChannelsOverviewCommand } from '@hades/bplus-it-sappi/channel-overview/application/create/create-channels-overview.command';

@ApiTags('[bplus-it-sappi] channel-overview')
@Controller('bplus-it-sappi/channels-overview')
export class CreateChannelsOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channels-overview in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ChannelOverviewDto] })
    @ApiBody({ type: [CreateChannelOverviewDto] })
    async main(@Body() payload: CreateChannelOverviewDto[])
    {
        await this.commandBus.dispatch(new CreateChannelsOverviewCommand(payload));
    }
}