import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindMessageOverviewQuery } from '@hades/bplus-it-sappi/message-overview/application/find/find-message-overview.query';

@ApiTags('[bplus-it-sappi] message-overview')
@Controller('bplus-it-sappi/message-overview')
export class FindMessageOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find message-overview according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: MessageOverviewDto })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindMessageOverviewQuery(queryStatements));   
    }
}