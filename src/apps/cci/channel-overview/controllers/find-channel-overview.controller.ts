import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindChannelOverviewQuery } from '@hades/cci/channel-overview/application/find/find-channel-overview.query';

@ApiTags('[cci] channel-overview')
@Controller('cci/channel-overview')
export class FindChannelOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channel-overview according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelOverviewDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new FindChannelOverviewQuery(queryStatement));   
    }
}