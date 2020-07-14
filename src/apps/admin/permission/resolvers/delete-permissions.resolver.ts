import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetPermissionsQuery } from '@hades/admin/permission/application/get/get-permissions.query';
import { DeletePermissionsCommand } from '@hades/admin/permission/application/delete/delete-permissions.command';

@Resolver()
export class DeletePermissionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeletePermissions')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const permissions = await this.queryBus.ask(new GetPermissionsQuery(queryStatements));

        await this.commandBus.dispatch(new DeletePermissionsCommand(queryStatements));

        return permissions;
    }
}