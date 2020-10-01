import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelOverviewByIdQuery } from '@hades/cci/channel-overview/application/find/find-channel-overview-by-id.query';
import { DeleteChannelOverviewByIdCommand } from '@hades/cci/channel-overview/application/delete/delete-channel-overview-by-id.command';

@ApiTags('[cci] channel-overview')
@Controller('cci/channel-overview')
export class DeleteChannelOverviewByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete channel-overview by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ChannelOverviewDto })
    async main(@Param('id') id: string)
    {
        const channelOverview = await this.queryBus.ask(new FindChannelOverviewByIdQuery(id));

        await this.commandBus.dispatch(new DeleteChannelOverviewByIdCommand(id));

        return channelOverview;
    }
}