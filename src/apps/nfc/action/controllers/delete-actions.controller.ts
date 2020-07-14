import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ActionDto } from './../dto/action.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetActionsQuery } from '@hades/nfc/action/application/get/get-actions.query';
import { DeleteActionsCommand } from '@hades/nfc/action/application/delete/delete-actions.command';

@ApiTags('[nfc] action')
@Controller('nfc/actions')
export class DeleteActionsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete actions in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ActionDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const actions = await this.queryBus.ask(new GetActionsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteActionsCommand(queryStatements));

        return actions;
    }
}