import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindChannelOverviewQuery } from '@hades/bplus-it-sappi/channel-overview/application/find/find-channel-overview.query';

@ApiTags('[bplus-it-sappi] channel-overview')
@Controller('bplus-it-sappi/channel-overview')
export class FindChannelOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channel-overview according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelOverviewDto })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindChannelOverviewQuery(queryStatements));   
    }
}