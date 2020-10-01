import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageOverviewByIdQuery } from '@hades/cci/message-overview/application/find/find-message-overview-by-id.query';

@ApiTags('[cci] message-overview')
@Controller('cci/message-overview')
export class FindMessageOverviewByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find message-overview by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: MessageOverviewDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(id));
    }
}