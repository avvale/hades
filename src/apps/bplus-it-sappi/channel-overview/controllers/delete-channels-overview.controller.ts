import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsOverviewQuery } from '@hades/bplus-it-sappi/channel-overview/application/get/get-channels-overview.query';
import { DeleteChannelsOverviewCommand } from '@hades/bplus-it-sappi/channel-overview/application/delete/delete-channels-overview.command';

@ApiTags('[bplus-it-sappi] channel-overview')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: ChannelOverviewDto})
@Controller('bplus-it-sappi/channels-overview')
export class DeleteChannelsOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete channels-overview in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const channelsOverview = await this.queryBus.ask(new GetChannelsOverviewQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteChannelsOverviewCommand(queryStatements));

        return channelsOverview;
    }
}