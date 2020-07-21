import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ResourceDto } from './../dto/resource.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetResourcesQuery } from '@hades/admin/resource/application/get/get-resources.query';
import { DeleteResourcesCommand } from '@hades/admin/resource/application/delete/delete-resources.command';

@ApiTags('[admin] resource')
@Controller('admin/resources')
export class DeleteResourcesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete resources in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ResourceDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const resources = await this.queryBus.ask(new GetResourcesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteResourcesCommand(queryStatements));

        return resources;
    }
}