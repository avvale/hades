import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindExecutionByIdQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution-by-id.query';
import { DeleteExecutionByIdCommand } from '@hades/bplus-it-sappi/execution/application/delete/delete-execution-by-id.command';

@ApiTags('[bplus-it-sappi] execution')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: ExecutionDto})
@Controller('bplus-it-sappi/execution')
export class DeleteExecutionByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete execution by id' })
    async main(@Param('id') id: string)
    {
        const execution = await this.queryBus.ask(new FindExecutionByIdQuery(id));

        await this.commandBus.dispatch(new DeleteExecutionByIdCommand(id));

        return execution;
    }
}