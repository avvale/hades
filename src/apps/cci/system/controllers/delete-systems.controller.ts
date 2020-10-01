import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetSystemsQuery } from '@hades/cci/system/application/get/get-systems.query';
import { DeleteSystemsCommand } from '@hades/cci/system/application/delete/delete-systems.command';

@ApiTags('[cci] system')
@Controller('cci/systems')
export class DeleteSystemsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete systems in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [SystemDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const systems = await this.queryBus.ask(new GetSystemsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteSystemsCommand(queryStatement));

        return systems;
    }
}