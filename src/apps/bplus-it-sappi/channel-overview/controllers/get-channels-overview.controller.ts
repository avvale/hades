import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsOverviewQuery } from '@hades/bplus-it-sappi/channel-overview/application/get/get-channels-overview.query';

@ApiTags('[bplus-it-sappi] channel-overview')
@ApiOkResponse({ description: 'The records has been found successfully.', type: ChannelOverviewDto})
@Controller('bplus-it-sappi/channels-overview')
export class GetChannelsOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channels-overview according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetChannelsOverviewQuery(queryStatements));   
    }
}