import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindContactQuery } from '@hades/bplus-it-sappi/contact/application/find/find-contact.query';

@ApiTags('[bplus-it-sappi] contact')
@ApiOkResponse({ description: 'The record has been successfully created.', type: ContactDto})
@Controller('bplus-it-sappi/contact')
export class FindContactController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find contact according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindContactQuery(queryStatements));   
    }
}