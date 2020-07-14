import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateChannelsQuery } from '@hades/bplus-it-sappi/channel/application/paginate/paginate-channels.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[bplus-it-sappi] channel')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: ChannelDto})
@Controller('bplus-it-sappi/channels/paginate')
export class PaginateChannelsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate channels' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateChannelsQuery(queryStatements, constraint));   
    }
}