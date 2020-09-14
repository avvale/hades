import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ClientDto } from './../dto/client.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetClientsQuery } from '@hades/o-auth/client/application/get/get-clients.query';
import { DeleteClientsCommand } from '@hades/o-auth/client/application/delete/delete-clients.command';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients')
export class DeleteClientsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete clients in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ClientDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const clients = await this.queryBus.ask(new GetClientsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteClientsCommand(queryStatements));

        return clients;
    }
}