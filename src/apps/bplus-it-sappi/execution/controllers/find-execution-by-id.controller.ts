import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindExecutionByIdQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution-by-id.query';

@ApiTags('[bplus-it-sappi] execution')
@Controller('bplus-it-sappi/execution')
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