import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';
import { DeleteClientByIdCommand } from '@hades/o-auth/client/application/delete/delete-client-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('oAuth.client.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteClientByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteClientById')
    async main(@Args('id') id: string, @Args('constraint') constraint?: QueryStatement, )
    {
        const client = await this.queryBus.ask(new FindClientByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteClientByIdCommand(id, constraint));

        return client;
    }
}