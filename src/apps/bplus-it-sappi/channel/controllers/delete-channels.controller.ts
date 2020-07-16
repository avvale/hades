import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsQuery } from '@hades/bplus-it-sappi/channel/application/get/get-channels.query';
import { DeleteChannelsCommand } from '@hades/bplus-it-sappi/channel/application/delete/delete-channels.command';

@ApiTags('[bplus-it-sappi] channel')
@Controller('bplus-it-sappi/channels')
export class DeleteChannelsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete channels in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ChannelDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const channels = await this.queryBus.ask(new GetChannelsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteChannelsCommand(queryStatements));

        return channels;
    }
}