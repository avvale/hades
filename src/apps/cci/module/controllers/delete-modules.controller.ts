import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetModulesQuery } from '@hades/cci/module/application/get/get-modules.query';
import { DeleteModulesCommand } from '@hades/cci/module/application/delete/delete-modules.command';

@ApiTags('[cci] module')
@Controller('cci/modules')
export class DeleteModulesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete modules in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ModuleDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const modules = await this.queryBus.ask(new GetModulesQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteModulesCommand(queryStatement));

        return modules;
    }
}