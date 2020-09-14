import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateRefreshTokenDto } from './../dto/create-refresh-token.dto';
import { RefreshTokenDto } from './../dto/refresh-token.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRefreshTokenByIdQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { CreateRefreshTokenCommand } from '@hades/o-auth/refresh-token/application/create/create-refresh-token.command';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token')
export class CreateRefreshTokenController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create refresh-token' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: RefreshTokenDto })
    async main(@Body() payload: CreateRefreshTokenDto)
    {
        await this.commandBus.dispatch(new CreateRefreshTokenCommand(
            payload.id,
            payload.accessTokenId,
            payload.token,
            payload.isRevoked,
            payload.expiresAt,
            
        ));

        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(payload.id));
    }
}