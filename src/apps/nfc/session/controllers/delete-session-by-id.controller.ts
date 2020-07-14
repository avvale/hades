import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SessionDto } from './../dto/session.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSessionByIdQuery } from '@hades/nfc/session/application/find/find-session-by-id.query';
import { DeleteSessionByIdCommand } from '@hades/nfc/session/application/delete/delete-session-by-id.command';

@ApiTags('[nfc] session')
@Controller('nfc/session')
export class DeleteSessionByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete session by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: SessionDto })
    async main(@Param('id') id: string)
    {
        const session = await this.queryBus.ask(new FindSessionByIdQuery(id));

        await this.commandBus.dispatch(new DeleteSessionByIdCommand(id));

        return session;
    }
}