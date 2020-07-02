import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDetailDto } from './../dto/job-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobDetailByIdQuery } from '@hades/bplus-it-sappi/job-detail/application/find/find-job-detail-by-id.query';

@ApiTags('[bplus-it-sappi] job-detail')
@ApiOkResponse({ description: 'The record has been successfully created.', type: JobDetailDto})
@Controller('bplus-it-sappi/job-detail')
export class FindJobDetailByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find job-detail by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindJobDetailByIdQuery(id));
    }
}