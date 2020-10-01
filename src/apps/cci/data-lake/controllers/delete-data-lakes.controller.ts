import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { DataLakeDto } from './../dto/data-lake.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetDataLakesQuery } from '@hades/cci/data-lake/application/get/get-data-lakes.query';
import { DeleteDataLakesCommand } from '@hades/cci/data-lake/application/delete/delete-data-lakes.command';

@ApiTags('[cci] data-lake')
@Controller('cci/data-lakes')
export class DeleteDataLakesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete data-lakes in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [DataLakeDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const dataLakes = await this.queryBus.ask(new GetDataLakesQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteDataLakesCommand(queryStatement));

        return dataLakes;
    }
}