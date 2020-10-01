import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelDetailDto } from './../dto/channel-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetChannelsDetailQuery } from '@hades/cci/channel-detail/application/get/get-channels-detail.query';
import { DeleteChannelsDetailCommand } from '@hades/cci/channel-detail/application/delete/delete-channels-detail.command';

@ApiTags('[cci] channel-detail')
@Controller('cci/channels-detail')
export class DeleteChannelsDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete channels-detail in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ChannelDetailDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const channelsDetail = await this.queryBus.ask(new GetChannelsDetailQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteChannelsDetailCommand(queryStatement));

        return channelsDetail;
    }
}