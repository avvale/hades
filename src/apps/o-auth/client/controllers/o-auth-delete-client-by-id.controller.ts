import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
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
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';
import { DeleteClientByIdCommand } from '@hades/o-auth/client/application/delete/delete-client-by-id.command';

@ApiTags('[o-auth] client')
@Controller('o-auth/client')
@Permissions('oAuth.client.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteClientByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete client by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ClientDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const client = await this.queryBus.ask(new FindClientByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteClientByIdCommand(id, constraint, { timezone }));

        return client;
    }
}