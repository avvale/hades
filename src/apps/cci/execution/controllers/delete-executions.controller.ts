import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetExecutionsQuery } from '@hades/cci/execution/application/get/get-executions.query';
import { DeleteExecutionsCommand } from '@hades/cci/execution/application/delete/delete-executions.command';

@ApiTags('[cci] execution')
@Controller('cci/executions')
export class DeleteExecutionsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete executions in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ExecutionDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const executions = await this.queryBus.ask(new GetExecutionsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteExecutionsCommand(queryStatement));

        return executions;
    }
}