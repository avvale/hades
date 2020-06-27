import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetExecutionsQuery } from '@hades/bplus-it-sappi/execution/application/get/get-executions.query';
import { DeleteExecutionsCommand } from '@hades/bplus-it-sappi/execution/application/delete/delete-executions.command';

@ApiTags('[bplus-it-sappi] execution')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: ExecutionDto})
@Controller('bplus-it-sappi/executions')
export class DeleteExecutionsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete executions in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const executions = await this.queryBus.ask(new GetExecutionsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteExecutionsCommand(queryStatements));

        return executions;
    }
}