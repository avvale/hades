import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindChannelOverviewQuery } from '@hades/bplus-it-sappi/channel-overview/application/find/find-channel-overview.query';

@ApiTags('[bplus-it-sappi] channel-overview')
@ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelOverviewDto})
@Controller('bplus-it-sappi/channel-overview')
export class FindChannelOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channel-overview according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindChannelOverviewQuery(queryStatements));   
    }
}