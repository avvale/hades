import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindMessageDetailQuery } from '@hades/cci/message-detail/application/find/find-message-detail.query';

@ApiTags('[cci] message-detail')
@Controller('cci/message-detail')
export class FindMessageDetailController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find message-detail according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: MessageDetailDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new FindMessageDetailQuery(queryStatement));   
    }
}