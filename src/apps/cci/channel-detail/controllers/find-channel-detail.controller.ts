import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelDetailDto } from './../dto/channel-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindChannelDetailQuery } from '@hades/cci/channel-detail/application/find/find-channel-detail.query';

@ApiTags('[cci] channel-detail')
@Controller('cci/channel-detail')
export class FindChannelDetailController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channel-detail according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelDetailDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new FindChannelDetailQuery(queryStatement));   
    }
}