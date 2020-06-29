import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDto } from './../dto/job.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobByIdQuery } from '@hades/bplus-it-sappi/job/application/find/find-job-by-id.query';
import { DeleteJobByIdCommand } from '@hades/bplus-it-sappi/job/application/delete/delete-job-by-id.command';

@ApiTags('[bplus-it-sappi] job')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: JobDto})
@Controller('bplus-it-sappi/job')
export class DeleteJobByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete job by id' })
    async main(@Param('id') id: string)
    {
        const job = await this.queryBus.ask(new FindJobByIdQuery(id));

        await this.commandBus.dispatch(new DeleteJobByIdCommand(id));

        return job;
    }
}