import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindChannelQuery } from '@hades/bplus-it-sappi/channel/application/find/find-channel.query';

@ApiTags('[bplus-it-sappi] channel')
@Controller('bplus-it-sappi/channel')
export class FindChannelController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find channel according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelDto })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindChannelQuery(queryStatements));   
    }
}