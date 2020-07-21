import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JobOverviewDto } from './../dto/job-overview.dto';
import { CreateJobOverviewDto } from './../dto/create-job-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateJobsOverviewCommand } from '@hades/bplus-it-sappi/job-overview/application/create/create-jobs-overview.command';

@ApiTags('[bplus-it-sappi] job-overview')
@Controller('bplus-it-sappi/jobs-overview')
export class CreateJobsOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create jobs-overview in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [JobOverviewDto] })
    @ApiBody({ type: [CreateJobOverviewDto] })
    async main(@Body() payload: CreateJobOverviewDto[])
    {
        await this.commandBus.dispatch(new CreateJobsOverviewCommand(payload));
    }
}