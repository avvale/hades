import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSystemsQuery } from '@hades/bplus-it-sappi/system/application/get/get-systems.query';
import { DeleteSystemsCommand } from '@hades/bplus-it-sappi/system/application/delete/delete-systems.command';

@ApiTags('[bplus-it-sappi] system')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: SystemDto})
@Controller('bplus-it-sappi/systems')
export class DeleteSystemsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete system in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const systems = await this.queryBus.ask(new GetSystemsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteSystemsCommand(queryStatements));

        return systems;
    }
}