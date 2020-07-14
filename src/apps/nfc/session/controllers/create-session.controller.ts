import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateSessionDto } from './../dto/create-session.dto';
import { SessionDto } from './../dto/session.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSessionByIdQuery } from '@hades/nfc/session/application/find/find-session-by-id.query';
import { CreateSessionCommand } from '@hades/nfc/session/application/create/create-session.command';

@ApiTags('[nfc] session')
@Controller('nfc/session')
export class CreateSessionController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create session' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: SessionDto })
    async main(@Body() payload: CreateSessionDto)
    {
        await this.commandBus.dispatch(new CreateSessionCommand(
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