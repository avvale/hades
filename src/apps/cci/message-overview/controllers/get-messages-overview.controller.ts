import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetMessagesOverviewQuery } from '@hades/cci/message-overview/application/get/get-messages-overview.query';

@ApiTags('[cci] message-overview')
@Controller('cci/messages-overview')
export class GetMessagesOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find messages-overview according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [MessageOverviewDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new GetMessagesOverviewQuery(queryStatement));   
    }
}