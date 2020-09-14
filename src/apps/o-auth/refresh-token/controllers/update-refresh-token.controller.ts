import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateRefreshTokenDto } from './../dto/update-refresh-token.dto';
import { RefreshTokenDto } from './../dto/refresh-token.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateRefreshTokenCommand } from '@hades/o-auth/refresh-token/application/update/update-refresh-token.command';
import { FindRefreshTokenByIdQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token')
export class UpdateRefreshTokenController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update refresh-token' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: RefreshTokenDto})
    async main(@Body() payload: UpdateRefreshTokenDto)
    {
        await this.commandBus.dispatch(new UpdateRefreshTokenCommand(
            payload.id,
            payload.accessTokenId,
            payload.token,
            payload.isRevoked,
            payload.expiresAt,
            
        ));

        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(payload.id));
    }
}