import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ClientDto } from './../dto/client.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';
import { DeleteClientByIdCommand } from '@hades/o-auth/client/application/delete/delete-client-by-id.command';

@ApiTags('[o-auth] client')
@Controller('o-auth/client')
export class DeleteClientByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete client by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ClientDto })
    async main(@Param('id') id: string)
    {
        const client = await this.queryBus.ask(new FindClientByIdQuery(id));

        await this.commandBus.dispatch(new DeleteClientByIdCommand(id));

        return client;
    }
}