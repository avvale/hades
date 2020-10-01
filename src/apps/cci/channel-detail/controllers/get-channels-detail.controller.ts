import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelDetailDto } from './../dto/channel-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetChannelsDetailQuery } from '@hades/cci/channel-detail/application/get/get-channels-detail.query';

@ApiTags('[cci] channel-detail')
@Controller('cci/channels-detail')
export class GetChannelsDetailController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channels-detail according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [ChannelDetailDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new GetChannelsDetailQuery(queryStatement));   
    }
}