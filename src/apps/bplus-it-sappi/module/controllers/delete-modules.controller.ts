import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetModulesQuery } from '@hades/bplus-it-sappi/module/application/get/get-modules.query';
import { DeleteModulesCommand } from '@hades/bplus-it-sappi/module/application/delete/delete-modules.command';

@ApiTags('[bplus-it-sappi] module')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: ModuleDto})
@Controller('bplus-it-sappi/modules')
export class DeleteModulesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete modules in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const modules = await this.queryBus.ask(new GetModulesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteModulesCommand(queryStatements));

        return modules;
    }
}