import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { DataLakeDto } from './../dto/data-lake.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetDataLakesQuery } from '@hades/cci/data-lake/application/get/get-data-lakes.query';

@ApiTags('[cci] data-lake')
@Controller('cci/data-lakes')
export class GetDataLakesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find data-lakes according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [DataLakeDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new GetDataLakesQuery(queryStatement));   
    }
}