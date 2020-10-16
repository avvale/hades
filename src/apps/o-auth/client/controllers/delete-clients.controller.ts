import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ClientDto } from './../dto/client.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetClientsQuery } from '@hades/o-auth/client/application/get/get-clients.query';
import { DeleteClientsCommand } from '@hades/o-auth/client/application/delete/delete-clients.command';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients')
@Permissions('oAuth.client.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteClientsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete clients in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ClientDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement, @Body('constraint') constraint?: QueryStatement, )
    {
        const clients = await this.queryBus.ask(new GetClientsQuery(queryStatement, constraint));

        await this.commandBus.dispatch(new DeleteClientsCommand(queryStatement, constraint));

        return clients;
    }
}