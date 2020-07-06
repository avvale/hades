import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsQuery } from '@hades/bplus-it-sappi/channel/application/get/get-channels.query';

@ApiTags('[bplus-it-sappi] channel')
@ApiOkResponse({ description: 'The records has been found successfully.', type: ChannelDto})
@Controller('bplus-it-sappi/channels')
export class GetChannelsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channels according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetChannelsQuery(queryStatements));   
    }
}