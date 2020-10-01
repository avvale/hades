import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ClientDto } from './../dto/client.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetClientsQuery } from '@hades/o-auth/client/application/get/get-clients.query';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients')
export class GetClientsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find clients according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [ClientDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new GetClientsQuery(queryStatement));   
    }
}