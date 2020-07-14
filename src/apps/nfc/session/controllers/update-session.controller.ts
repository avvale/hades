import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateSessionDto } from './../dto/update-session.dto';
import { SessionDto } from './../dto/session.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateSessionCommand } from '@hades/nfc/session/application/update/update-session.command';
import { FindSessionByIdQuery } from '@hades/nfc/session/application/find/find-session-by-id.query';

@ApiTags('[nfc] session')
@Controller('nfc/session')
export class UpdateSessionController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update session' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: SessionDto})
    async main(@Body() payload: UpdateSessionDto)
    {
        await this.commandBus.dispatch(new UpdateSessionCommand(
            payload.id,
            payload.ip,
            payload.tagId,
            payload.uid,
            payload.counter,
            payload.expiredAt,
            
        ));

        return await this.queryBus.ask(new FindSessionByIdQuery(payload.id));
    }
}