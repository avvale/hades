import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SessionDto } from './../dto/session.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSessionsQuery } from '@hades/nfc/session/application/get/get-sessions.query';

@ApiTags('[nfc] session')
@Controller('nfc/sessions')
export class GetSessionsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find sessions according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [SessionDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetSessionsQuery(queryStatements));   
    }
}