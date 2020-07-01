import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobOverviewDto } from './../dto/job-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobOverviewByIdQuery } from '@hades/bplus-it-sappi/job-overview/application/find/find-job-overview-by-id.query';

@ApiTags('[bplus-it-sappi] job-overview')
@ApiOkResponse({ description: 'The record has been successfully created.', type: JobOverviewDto})
@Controller('bplus-it-sappi/job-overview')
export class FindJobOverviewByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find job-overview by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindJobOverviewByIdQuery(id));
    }
}