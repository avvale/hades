import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetMessagesOverviewQuery } from '@hades/bplus-it-sappi/message-overview/application/get/get-messages-overview.query';

@ApiTags('[bplus-it-sappi] message-overview')
@Controller('bplus-it-sappi/messages-overview')
export class GetMessagesOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find messages-overview according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [MessageOverviewDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetMessagesOverviewQuery(queryStatements));   
    }
}