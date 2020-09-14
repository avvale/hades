import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RefreshTokenDto } from './../dto/refresh-token.dto';
import { CreateRefreshTokenDto } from './../dto/create-refresh-token.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateRefreshTokensCommand } from '@hades/o-auth/refresh-token/application/create/create-refresh-tokens.command';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens')
export class CreateRefreshTokensController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create refresh-tokens in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [RefreshTokenDto] })
    @ApiBody({ type: [CreateRefreshTokenDto] })
    async main(@Body() payload: CreateRefreshTokenDto[])
    {
        await this.commandBus.dispatch(new CreateRefreshTokensCommand(payload));
    }
}