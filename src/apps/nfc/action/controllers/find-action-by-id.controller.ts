import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ActionDto } from './../dto/action.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindActionByIdQuery } from '@hades/nfc/action/application/find/find-action-by-id.query';

@ApiTags('[nfc] action')
@Controller('nfc/action')
export class FindActionByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find action by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ActionDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindActionByIdQuery(id));
    }
}