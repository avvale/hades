import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetContactsQuery } from '@hades/cci/contact/application/get/get-contacts.query';

@ApiTags('[cci] contact')
@Controller('cci/contacts')
export class GetContactsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find contacts according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [ContactDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new GetContactsQuery(queryStatement));   
    }
}