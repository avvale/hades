import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetMessagesDetailQuery } from '@hades/cci/message-detail/application/get/get-messages-detail.query';
import { DeleteMessagesDetailCommand } from '@hades/cci/message-detail/application/delete/delete-messages-detail.command';

@ApiTags('[cci] message-detail')
@Controller('cci/messages-detail')
export class DeleteMessagesDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete messages-detail in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [MessageDetailDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const messagesDetail = await this.queryBus.ask(new GetMessagesDetailQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteMessagesDetailCommand(queryStatement));

        return messagesDetail;
    }
}