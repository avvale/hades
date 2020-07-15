import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelDetailDto } from './../dto/channel-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsDetailQuery } from '@hades/bplus-it-sappi/channel-detail/application/get/get-channels-detail.query';
import { DeleteChannelsDetailCommand } from '@hades/bplus-it-sappi/channel-detail/application/delete/delete-channels-detail.command';

@ApiTags('[bplus-it-sappi] channel-detail')
@Controller('bplus-it-sappi/channels-detail')
export class DeleteChannelsDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete channels-detail in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ChannelDetailDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const channelsDetail = await this.queryBus.ask(new GetChannelsDetailQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteChannelsDetailCommand(queryStatements));

        return channelsDetail;
    }
}