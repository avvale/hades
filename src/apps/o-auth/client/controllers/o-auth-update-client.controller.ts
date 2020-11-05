import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateClientDto } from './../dto/update-client.dto';
import { ClientDto } from './../dto/client.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateClientCommand } from '@hades/o-auth/client/application/update/update-client.command';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';

@ApiTags('[o-auth] client')
@Controller('o-auth/client')
@Permissions('oAuth.client.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateClientController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update client' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ClientDto})
    async main(
        @Body() payload: UpdateClientDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateClientCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindClientByIdQuery(payload.id, constraint, { timezone }));
    }
}