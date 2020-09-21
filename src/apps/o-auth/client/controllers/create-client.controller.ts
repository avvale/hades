import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateClientDto } from './../dto/create-client.dto';
import { ClientDto } from './../dto/client.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';
import { CreateClientCommand } from '@hades/o-auth/client/application/create/create-client.command';

@ApiTags('[o-auth] client')
@Controller('o-auth/client')
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
            payload.applicationCodes,
            payload.expiredAccessToken,
            payload.expiredRefreshToken,
            payload.isRevoked,
            payload.isMaster,
            payload.applicationIds,
            
        ));

        return await this.queryBus.ask(new FindClientByIdQuery(payload.id));
    }
}