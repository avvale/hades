import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelDetailDto } from './../dto/channel-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelDetailByIdQuery } from '@hades/bplus-it-sappi/channel-detail/application/find/find-channel-detail-by-id.query';
import { DeleteChannelDetailByIdCommand } from '@hades/bplus-it-sappi/channel-detail/application/delete/delete-channel-detail-by-id.command';

@ApiTags('[bplus-it-sappi] channel-detail')
@Controller('bplus-it-sappi/channel-detail')
export class DeleteChannelDetailByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete channel-detail by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ChannelDetailDto })
    async main(@Param('id') id: string)
    {
        const channelDetail = await this.queryBus.ask(new FindChannelDetailByIdQuery(id));

        await this.commandBus.dispatch(new DeleteChannelDetailByIdCommand(id));

        return channelDetail;
    }
}