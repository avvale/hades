import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelByIdQuery } from '@hades/cci/channel/application/find/find-channel-by-id.query';

@ApiTags('[cci] channel')
@Controller('cci/channel')
export class FindChannelByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find channel by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindChannelByIdQuery(id));
    }
}