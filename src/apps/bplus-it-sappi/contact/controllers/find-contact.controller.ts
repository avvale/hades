import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindContactQuery } from '@hades/bplus-it-sappi/contact/application/find/find-contact.query';

@ApiTags('[bplus-it-sappi] contact')
@Controller('bplus-it-sappi/contact')
export class FindContactController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find contact according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ContactDto })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindContactQuery(queryStatements));   
    }
}