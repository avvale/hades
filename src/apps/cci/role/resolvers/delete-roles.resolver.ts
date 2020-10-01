import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetRolesQuery } from '@hades/cci/role/application/get/get-roles.query';
import { DeleteRolesCommand } from '@hades/cci/role/application/delete/delete-roles.command';

@Resolver()
export class DeleteRolesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteRoles')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const roles = await this.queryBus.ask(new GetRolesQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteRolesCommand(queryStatement));

        return roles;
    }
}