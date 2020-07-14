import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TagDto } from './../dto/tag.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTagByIdQuery } from '@hades/nfc/tag/application/find/find-tag-by-id.query';

@ApiTags('[nfc] tag')
@Controller('nfc/tag')
export class FindTagByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find tag by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: TagDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindTagByIdQuery(id));
    }
}