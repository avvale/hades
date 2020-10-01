import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetMessagesDetailQuery } from '@hades/cci/message-detail/application/get/get-messages-detail.query';

@ApiTags('[cci] message-detail')
@Controller('cci/messages-detail')
export class GetMessagesDetailController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find messages-detail according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [MessageDetailDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new GetMessagesDetailQuery(queryStatement));   
    }
}