import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateClientDto } from './../dto/create-client.dto';
import { ClientDto } from './../dto/client.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';
import { CreateClientCommand } from '@hades/o-auth/client/application/create/create-client.command';

@ApiTags('[o-auth] client')
@Controller('o-auth/client')
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateClientController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create client' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ClientDto })
    async main(@Body() payload: CreateClientDto)
    {
        await this.commandBus.dispatch(new CreateClientCommand(
            payload.id,
            payload.grantType,
            payload.name,
            payload.secret,
            payload.authUrl,
            payload.redirect,
            payload.expiredAccessToken,
            payload.expiredRefreshToken,
            payload.isRevoked,
            payload.isMaster,
            payload.applicationIds,
            
        ));

        return await this.queryBus.ask(new FindClientByIdQuery(payload.id));
    }
}