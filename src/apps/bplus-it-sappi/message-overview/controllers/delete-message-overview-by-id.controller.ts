import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindMessageOverviewByIdQuery } from '@hades/bplus-it-sappi/message-overview/application/find/find-message-overview-by-id.query';
import { DeleteMessageOverviewByIdCommand } from '@hades/bplus-it-sappi/message-overview/application/delete/delete-message-overview-by-id.command';

@ApiTags('[bplus-it-sappi] message-overview')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: MessageOverviewDto})
@Controller('bplus-it-sappi/message-overview')
export class DeleteMessageOverviewByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete message-overview by id' })
    async main(@Param('id') id: string)
    {
        const messageOverview = await this.queryBus.ask(new FindMessageOverviewByIdQuery(id));

        await this.commandBus.dispatch(new DeleteMessageOverviewByIdCommand(id));

        return messageOverview;
    }
}