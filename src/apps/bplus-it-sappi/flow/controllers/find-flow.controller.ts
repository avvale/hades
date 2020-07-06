import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindFlowQuery } from '@hades/bplus-it-sappi/flow/application/find/find-flow.query';

@ApiTags('[bplus-it-sappi] flow')
@ApiOkResponse({ description: 'The record has been successfully created.', type: FlowDto})
@Controller('bplus-it-sappi/flow')
export class FindFlowController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find flow according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindFlowQuery(queryStatements));   
    }
}