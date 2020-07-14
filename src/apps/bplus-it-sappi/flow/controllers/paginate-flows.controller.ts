import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateFlowsQuery } from '@hades/bplus-it-sappi/flow/application/paginate/paginate-flows.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[bplus-it-sappi] flow')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: FlowDto})
@Controller('bplus-it-sappi/flows/paginate')
export class PaginateFlowsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate flows' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateFlowsQuery(queryStatements, constraint));   
    }
}