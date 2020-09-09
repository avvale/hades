import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ApplicationDto } from './../dto/application.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindApplicationQuery } from '@hades/o-auth/application/application/find/find-application.query';

@ApiTags('[o-auth] application')
@Controller('o-auth/application')
export class FindApplicationController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find application according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ApplicationDto })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindApplicationQuery(queryStatements));   
    }
}