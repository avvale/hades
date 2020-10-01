import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobOverviewDto } from './../dto/job-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindJobOverviewByIdQuery } from '@hades/cci/job-overview/application/find/find-job-overview-by-id.query';

@ApiTags('[cci] job-overview')
@Controller('cci/job-overview')
export class FindJobOverviewByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find job-overview by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: JobOverviewDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindJobOverviewByIdQuery(id));
    }
}