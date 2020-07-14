import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { DataLakeDto } from './../dto/data-lake.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindDataLakeByIdQuery } from '@hades/bplus-it-sappi/data-lake/application/find/find-data-lake-by-id.query';

@ApiTags('[bplus-it-sappi] data-lake')
@ApiOkResponse({ description: 'The record has been successfully created.', type: DataLakeDto})
@Controller('bplus-it-sappi/data-lake')
export class FindDataLakeByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find data-lake by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindDataLakeByIdQuery(id));
    }
}