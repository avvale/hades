import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetContactsQuery } from '@hades/bplus-it-sappi/contact/application/get/get-contacts.query';

@ApiTags('[bplus-it-sappi] contact')
@ApiOkResponse({ description: 'The records has been found successfully.', type: ContactDto})
@Controller('bplus-it-sappi/contacts')
export class GetContactsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find contacts according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetContactsQuery(queryStatements));   
    }
}