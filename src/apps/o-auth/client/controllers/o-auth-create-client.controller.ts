import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateClientDto } from './../dto/create-client.dto';
import { ClientDto } from './../dto/client.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';
import { CreateClientCommand } from '@hades/o-auth/client/application/create/create-client.command';

@ApiTags('[o-auth] client')
@Controller('o-auth/client')
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateClientController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create client' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ClientDto })
    async main(
        @Body() payload: CreateClientDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateClientCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindClientByIdQuery(payload.id, {}, { timezone }));
    }
}