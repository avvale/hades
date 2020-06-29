import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDto } from './../dto/job.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobByIdQuery } from '@hades/bplus-it-sappi/job/application/find/find-job-by-id.query';

@ApiTags('[bplus-it-sappi] job')
@ApiOkResponse({ description: 'The record has been successfully created.', type: JobDto})
@Controller('bplus-it-sappi/job')
export class FindJobByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find job by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindJobByIdQuery(id));
    }
}