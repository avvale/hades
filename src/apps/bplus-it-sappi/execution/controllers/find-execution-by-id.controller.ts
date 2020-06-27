import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindExecutionByIdQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution-by-id.query';

@ApiTags('[bplus-it-sappi] execution')
@ApiOkResponse({ description: 'The record has been successfully created.', type: ExecutionDto})
@Controller('bplus-it-sappi/execution')
export class FindExecutionByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find execution by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindExecutionByIdQuery(id));
    }
}