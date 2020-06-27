import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindExecutionQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution.query';

@ApiTags('[bplus-it-sappi] execution')
@ApiOkResponse({ description: 'The record has been successfully created.', type: ExecutionDto})
@Controller('bplus-it-sappi/execution')
export class FindExecutionController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find execution according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindExecutionQuery(queryStatements));   
    }
}