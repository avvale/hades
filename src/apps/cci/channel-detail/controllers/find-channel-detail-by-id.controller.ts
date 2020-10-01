import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelDetailDto } from './../dto/channel-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelDetailByIdQuery } from '@hades/cci/channel-detail/application/find/find-channel-detail-by-id.query';

@ApiTags('[cci] channel-detail')
@Controller('cci/channel-detail')
export class FindChannelDetailByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find channel-detail by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelDetailDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindChannelDetailByIdQuery(id));
    }
}