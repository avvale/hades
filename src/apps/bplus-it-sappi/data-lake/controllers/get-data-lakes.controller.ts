import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { DataLakeDto } from './../dto/data-lake.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetDataLakesQuery } from '@hades/bplus-it-sappi/data-lake/application/get/get-data-lakes.query';

@ApiTags('[bplus-it-sappi] data-lake')
@Controller('bplus-it-sappi/data-lakes')
export class GetDataLakesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find data-lakes according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [DataLakeDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetDataLakesQuery(queryStatements));   
    }
}