import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SessionDto } from './../dto/session.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSessionsQuery } from '@hades/nfc/session/application/get/get-sessions.query';
import { DeleteSessionsCommand } from '@hades/nfc/session/application/delete/delete-sessions.command';

@ApiTags('[nfc] session')
@Controller('nfc/sessions')
export class DeleteSessionsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete sessions in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [SessionDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const sessions = await this.queryBus.ask(new GetSessionsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteSessionsCommand(queryStatements));

        return sessions;
    }
}