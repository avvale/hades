import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetChannelsQuery } from '@hades/cci/channel/application/get/get-channels.query';
import { DeleteChannelsCommand } from '@hades/cci/channel/application/delete/delete-channels.command';

@ApiTags('[cci] channel')
@Controller('cci/channels')
export class DeleteChannelsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete channels in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ChannelDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const channels = await this.queryBus.ask(new GetChannelsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteChannelsCommand(queryStatement));

        return channels;
    }
}