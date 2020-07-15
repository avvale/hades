import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDetailDto } from './../dto/job-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindJobDetailByIdQuery } from '@hades/bplus-it-sappi/job-detail/application/find/find-job-detail-by-id.query';
import { DeleteJobDetailByIdCommand } from '@hades/bplus-it-sappi/job-detail/application/delete/delete-job-detail-by-id.command';

@ApiTags('[bplus-it-sappi] job-detail')
@Controller('bplus-it-sappi/job-detail')
export class DeleteJobDetailByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete job-detail by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: JobDetailDto })
    async main(@Param('id') id: string)
    {
        const jobDetail = await this.queryBus.ask(new FindJobDetailByIdQuery(id));

        await this.commandBus.dispatch(new DeleteJobDetailByIdCommand(id));

        return jobDetail;
    }
}