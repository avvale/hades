import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageDetailByIdQuery } from '@hades/cci/message-detail/application/find/find-message-detail-by-id.query';
import { DeleteMessageDetailByIdCommand } from '@hades/cci/message-detail/application/delete/delete-message-detail-by-id.command';

@ApiTags('[cci] message-detail')
@Controller('cci/message-detail')
export class DeleteMessageDetailByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete message-detail by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: MessageDetailDto })
    async main(@Param('id') id: string)
    {
        const messageDetail = await this.queryBus.ask(new FindMessageDetailByIdQuery(id));

        await this.commandBus.dispatch(new DeleteMessageDetailByIdCommand(id));

        return messageDetail;
    }
}