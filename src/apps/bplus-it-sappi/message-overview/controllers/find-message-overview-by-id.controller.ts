import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindMessageOverviewByIdQuery } from '@hades/bplus-it-sappi/message-overview/application/find/find-message-overview-by-id.query';

@ApiTags('[bplus-it-sappi] message-overview')
@ApiOkResponse({ description: 'The record has been successfully created.', type: MessageOverviewDto})
@Controller('bplus-it-sappi/message-overview')
export class FindMessageOverviewByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find message-overview by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(id));
    }
}