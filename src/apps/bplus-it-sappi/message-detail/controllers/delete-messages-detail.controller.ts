import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetMessagesDetailQuery } from '@hades/bplus-it-sappi/message-detail/application/get/get-messages-detail.query';
import { DeleteMessagesDetailCommand } from '@hades/bplus-it-sappi/message-detail/application/delete/delete-messages-detail.command';

@ApiTags('[bplus-it-sappi] message-detail')
@Controller('bplus-it-sappi/messages-detail')
export class DeleteMessagesDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete messages-detail in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [MessageDetailDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const messagesDetail = await this.queryBus.ask(new GetMessagesDetailQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteMessagesDetailCommand(queryStatements));

        return messagesDetail;
    }
}