import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindChannelQuery } from '@hades/cci/channel/application/find/find-channel.query';

@ApiTags('[cci] channel')
@Controller('cci/channel')
export class FindChannelController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channel according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new FindChannelQuery(queryStatement));   
    }
}