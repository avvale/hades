import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelDetailDto } from './../dto/channel-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindChannelDetailQuery } from '@hades/bplus-it-sappi/channel-detail/application/find/find-channel-detail.query';

@ApiTags('[bplus-it-sappi] channel-detail')
@Controller('bplus-it-sappi/channel-detail')
export class FindChannelDetailController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channel-detail according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelDetailDto })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindChannelDetailQuery(queryStatements));   
    }
}