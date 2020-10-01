import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindExecutionByIdQuery } from '@hades/cci/execution/application/find/find-execution-by-id.query';

@ApiTags('[cci] execution')
@Controller('cci/execution')
export class FindExecutionByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find execution by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ExecutionDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindExecutionByIdQuery(id));
    }
}