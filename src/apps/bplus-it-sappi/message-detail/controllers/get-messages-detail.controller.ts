import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetMessagesDetailQuery } from '@hades/bplus-it-sappi/message-detail/application/get/get-messages-detail.query';

@ApiTags('[bplus-it-sappi] message-detail')
@Controller('bplus-it-sappi/messages-detail')
export class GetMessagesDetailController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find messages-detail according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [MessageDetailDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetMessagesDetailQuery(queryStatements));   
    }
}