import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetBoundedContextsQuery } from '@hades/iam/bounded-context/application/get/get-bounded-contexts.query';
import { DeleteBoundedContextsCommand } from '@hades/iam/bounded-context/application/delete/delete-bounded-contexts.command';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts')
export class DeleteBoundedContextsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete bounded-contexts in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [BoundedContextDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const boundedContexts = await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteBoundedContextsCommand(queryStatement));

        return boundedContexts;
    }
}