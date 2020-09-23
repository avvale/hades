import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetPermissionsQuery } from '@hades/iam/permission/application/get/get-permissions.query';
import { DeletePermissionsCommand } from '@hades/iam/permission/application/delete/delete-permissions.command';

@Resolver()
export class DeletePermissionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeletePermissions')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const permissions = await this.queryBus.ask(new GetPermissionsQuery(queryStatement));

        await this.commandBus.dispatch(new DeletePermissionsCommand(queryStatement));

        return permissions;
    }
}