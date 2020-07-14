import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SummaryDto } from './../dto/summary.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSummaryByIdQuery } from '@hades/nfc/summary/application/find/find-summary-by-id.query';

@ApiTags('[nfc] summary')
@Controller('nfc/summary')
export class FindSummaryByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find summary by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: SummaryDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindSummaryByIdQuery(id));
    }
}