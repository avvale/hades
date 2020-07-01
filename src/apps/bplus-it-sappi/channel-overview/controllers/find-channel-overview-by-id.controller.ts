import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindChannelOverviewByIdQuery } from '@hades/bplus-it-sappi/channel-overview/application/find/find-channel-overview-by-id.query';

@ApiTags('[bplus-it-sappi] channel-overview')
@ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelOverviewDto})
@Controller('bplus-it-sappi/channel-overview')
export class FindChannelOverviewByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find channel-overview by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindChannelOverviewByIdQuery(id));
    }
}