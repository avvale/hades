import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { SessionDto } from './../dto/session.dto';
import { CreateSessionDto } from './../dto/create-session.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertSessionsCommand } from '@hades/nfc/session/application/insert/insert-sessions.command';

@ApiTags('[nfc] session')
@Controller('nfc/sessions')
export class InsertSessionsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert sessions in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [SessionDto] })
    @ApiBody({ type: [CreateSessionDto] })
    async main(@Body() payload: CreateSessionDto[])
    {
        await this.commandBus.dispatch(new InsertSessionsCommand(payload));
    }
}