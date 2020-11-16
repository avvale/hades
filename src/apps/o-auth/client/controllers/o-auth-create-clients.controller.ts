import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ClientDto } from './../dto/client.dto';
import { CreateClientDto } from './../dto/create-client.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateClientsCommand } from '@hades/o-auth/client/application/create/create-clients.command';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients')
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateClientsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create clients in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ClientDto] })
    @ApiBody({ type: [CreateClientDto] })
    async main(
        @Body() payload: CreateClientDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateClientsCommand(payload, { timezone }));
    }
}