import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { DataLakeDto } from './../dto/data-lake.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetDataLakesQuery } from '@hades/bplus-it-sappi/data-lake/application/get/get-data-lakes.query';
import { DeleteDataLakesCommand } from '@hades/bplus-it-sappi/data-lake/application/delete/delete-data-lakes.command';

@ApiTags('[bplus-it-sappi] data-lake')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: DataLakeDto})
@Controller('bplus-it-sappi/data-lakes')
export class DeleteDataLakesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete data-lakes in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const dataLakes = await this.queryBus.ask(new GetDataLakesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteDataLakesCommand(queryStatements));

        return dataLakes;
    }
}