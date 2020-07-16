import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetMessagesOverviewQuery } from '@hades/bplus-it-sappi/message-overview/application/get/get-messages-overview.query';
import { DeleteMessagesOverviewCommand } from '@hades/bplus-it-sappi/message-overview/application/delete/delete-messages-overview.command';

@ApiTags('[bplus-it-sappi] message-overview')
@Controller('bplus-it-sappi/messages-overview')
export class DeleteMessagesOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete messages-overview in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [MessageOverviewDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const messagesOverview = await this.queryBus.ask(new GetMessagesOverviewQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteMessagesOverviewCommand(queryStatements));

        return messagesOverview;
    }
}