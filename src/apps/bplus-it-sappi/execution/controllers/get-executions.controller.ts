import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetExecutionsQuery } from '@hades/bplus-it-sappi/execution/application/get/get-executions.query';

@ApiTags('[bplus-it-sappi] execution')
@ApiOkResponse({ description: 'The records has been found successfully.', type: ExecutionDto})
@Controller('bplus-it-sappi/executions')
export class GetExecutionsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find executions according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetExecutionsQuery(queryStatements));   
    }
}