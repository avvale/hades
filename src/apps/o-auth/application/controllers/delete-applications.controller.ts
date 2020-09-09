import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ApplicationDto } from './../dto/application.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetApplicationsQuery } from '@hades/o-auth/application/application/get/get-applications.query';
import { DeleteApplicationsCommand } from '@hades/o-auth/application/application/delete/delete-applications.command';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications')
export class DeleteApplicationsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete applications in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ApplicationDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const applications = await this.queryBus.ask(new GetApplicationsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteApplicationsCommand(queryStatements));

        return applications;
    }
}