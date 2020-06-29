import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateJobDto } from './../dto/create-job.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertJobsCommand } from '@hades/bplus-it-sappi/job/application/insert/insert-jobs.command';

@ApiTags('[bplus-it-sappi] job')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('bplus-it-sappi/jobs')
export class InsertJobsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert jobs in batch' })
    @ApiBody({ 
        type: [CreateJobDto]
    })
    async main(@Body() payload: CreateJobDto[])
    {
        await this.commandBus.dispatch(new InsertJobsCommand(payload));
    }
}