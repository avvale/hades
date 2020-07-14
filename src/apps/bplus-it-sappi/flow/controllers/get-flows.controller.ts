import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetFlowsQuery } from '@hades/bplus-it-sappi/flow/application/get/get-flows.query';

@ApiTags('[bplus-it-sappi] flow')
@ApiOkResponse({ description: 'The records has been found successfully.', type: FlowDto})
@Controller('bplus-it-sappi/flows')
export class GetFlowsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find flows according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetFlowsQuery(queryStatements));   
    }
}