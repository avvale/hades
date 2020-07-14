import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetBoundedContextsQuery } from '@hades/admin/bounded-context/application/get/get-bounded-contexts.query';
import { DeleteBoundedContextsCommand } from '@hades/admin/bounded-context/application/delete/delete-bounded-contexts.command';

@ApiTags('[admin] bounded-context')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: BoundedContextDto})
@Controller('admin/bounded-contexts')
export class DeleteBoundedContextsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete bounded-contexts in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const boundedContexts = await this.queryBus.ask(new GetBoundedContextsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteBoundedContextsCommand(queryStatements));

        return boundedContexts;
    }
}