import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateExecutionsQuery } from '@hades/bplus-it-sappi/execution/application/paginate/paginate-executions.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[bplus-it-sappi] execution')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: ExecutionDto})
@Controller('bplus-it-sappi/executions/paginate')
export class PaginateExecutionsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate executions' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateExecutionsQuery(queryStatements, constraint));   
    }
}