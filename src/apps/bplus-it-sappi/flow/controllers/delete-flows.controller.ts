import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetFlowsQuery } from '@hades/bplus-it-sappi/flow/application/get/get-flows.query';
import { DeleteFlowsCommand } from '@hades/bplus-it-sappi/flow/application/delete/delete-flows.command';

@ApiTags('[bplus-it-sappi] flow')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: FlowDto})
@Controller('bplus-it-sappi/flows')
export class DeleteFlowsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete flows in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const flows = await this.queryBus.ask(new GetFlowsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteFlowsCommand(queryStatements));

        return flows;
    }
}