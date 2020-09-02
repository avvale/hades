import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetRolesQuery } from '@hades/admin/role/application/get/get-roles.query';
import { DeleteRolesCommand } from '@hades/admin/role/application/delete/delete-roles.command';

@Resolver()
export class DeleteRolesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteRoles')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const roles = await this.queryBus.ask(new GetRolesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteRolesCommand(queryStatements));

        return roles;
    }
}