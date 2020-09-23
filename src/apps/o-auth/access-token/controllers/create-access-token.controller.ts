import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateAccessTokenDto } from './../dto/create-access-token.dto';
import { AccessTokenDto } from './../dto/access-token.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';
import { CreateAccessTokenCommand } from '@hades/o-auth/access-token/application/create/create-access-token.command';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token')
export class CreateAccessTokenController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create access-token' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AccessTokenDto })
    async main(@Body() payload: CreateAccessTokenDto)
    {
        await this.commandBus.dispatch(new CreateAccessTokenCommand(
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