import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetFlowsQuery } from '@hades/cci/flow/application/get/get-flows.query';
import { DeleteFlowsCommand } from '@hades/cci/flow/application/delete/delete-flows.command';

@ApiTags('[cci] flow')
@Controller('cci/flows')
export class DeleteFlowsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete flows in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [FlowDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const flows = await this.queryBus.ask(new GetFlowsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteFlowsCommand(queryStatement));

        return flows;
    }
}