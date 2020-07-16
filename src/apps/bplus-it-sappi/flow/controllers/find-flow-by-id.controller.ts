import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindFlowByIdQuery } from '@hades/bplus-it-sappi/flow/application/find/find-flow-by-id.query';

@ApiTags('[bplus-it-sappi] flow')
@Controller('bplus-it-sappi/flow')
export class FindFlowByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find flow by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: FlowDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindFlowByIdQuery(id));
    }
}