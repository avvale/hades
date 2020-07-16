import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateContactsQuery } from '@hades/bplus-it-sappi/contact/application/paginate/paginate-contacts.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';

@ApiTags('[bplus-it-sappi] contact')
@Controller('bplus-it-sappi/contacts/paginate')
export class PaginateContactsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate contacts' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatements', type: [QueryStatementInput] })
    @ApiQuery({ name: 'constraint', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateContactsQuery(queryStatements, constraint));   
    }
}