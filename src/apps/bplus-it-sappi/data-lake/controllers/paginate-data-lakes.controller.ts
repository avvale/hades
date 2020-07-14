import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { DataLakeDto } from './../dto/data-lake.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateDataLakesQuery } from '@hades/bplus-it-sappi/data-lake/application/paginate/paginate-data-lakes.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[bplus-it-sappi] data-lake')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: DataLakeDto})
@Controller('bplus-it-sappi/data-lakes/paginate')
export class PaginateDataLakesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate data-lakes' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateDataLakesQuery(queryStatements, constraint));   
    }
}