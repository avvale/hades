import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SessionDto } from './../dto/session.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindSessionByIdQuery } from '@hades/nfc/session/application/find/find-session-by-id.query';

@ApiTags('[nfc] session')
@Controller('nfc/session')
export class FindSessionByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find session by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: SessionDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindSessionByIdQuery(id));
    }
}