import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateChannelsOverviewQuery } from '@hades/bplus-it-sappi/channel-overview/application/paginate/paginate-channels-overview.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[bplus-it-sappi] channel-overview')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: ChannelOverviewDto})
@Controller('bplus-it-sappi/channels-overview/paginate')
export class PaginateChannelsOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate channels-overview' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateChannelsOverviewQuery(queryStatements, constraint));   
    }
}