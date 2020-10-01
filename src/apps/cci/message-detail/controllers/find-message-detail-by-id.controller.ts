import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageDetailByIdQuery } from '@hades/cci/message-detail/application/find/find-message-detail-by-id.query';

@ApiTags('[cci] message-detail')
@Controller('cci/message-detail')
export class FindMessageDetailByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find message-detail by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: MessageDetailDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindMessageDetailByIdQuery(id));
    }
}