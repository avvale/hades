import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetMessagesOverviewQuery } from '@hades/cci/message-overview/application/get/get-messages-overview.query';
import { DeleteMessagesOverviewCommand } from '@hades/cci/message-overview/application/delete/delete-messages-overview.command';

@ApiTags('[cci] message-overview')
@Controller('cci/messages-overview')
export class DeleteMessagesOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete messages-overview in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [MessageOverviewDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const messagesOverview = await this.queryBus.ask(new GetMessagesOverviewQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteMessagesOverviewCommand(queryStatement));

        return messagesOverview;
    }
}