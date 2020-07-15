import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelDetailDto } from './../dto/channel-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsDetailQuery } from '@hades/bplus-it-sappi/channel-detail/application/get/get-channels-detail.query';

@ApiTags('[bplus-it-sappi] channel-detail')
@Controller('bplus-it-sappi/channels-detail')
export class GetChannelsDetailController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channels-detail according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [ChannelDetailDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetChannelsDetailQuery(queryStatements));   
    }
}