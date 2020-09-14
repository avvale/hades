import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateAccessTokenDto } from './../dto/update-access-token.dto';
import { AccessTokenDto } from './../dto/access-token.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateAccessTokenCommand } from '@hades/o-auth/access-token/application/update/update-access-token.command';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token')
export class UpdateAccessTokenController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update access-token' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AccessTokenDto})
    async main(@Body() payload: UpdateAccessTokenDto)
    {
        await this.commandBus.dispatch(new UpdateAccessTokenCommand(
            payload.id,
            payload.clientId,
            payload.token,
            payload.name,
            payload.isRevoked,
            payload.expiresAt,
            
        ));

        return await this.queryBus.ask(new FindAccessTokenByIdQuery(payload.id));
    }
}