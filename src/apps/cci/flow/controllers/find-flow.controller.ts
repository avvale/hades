import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindFlowQuery } from '@hades/cci/flow/application/find/find-flow.query';

@ApiTags('[cci] flow')
@Controller('cci/flow')
export class FindFlowController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find flow according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: FlowDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new FindFlowQuery(queryStatement));   
    }
}