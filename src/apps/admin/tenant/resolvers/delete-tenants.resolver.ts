import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetTenantsQuery } from '@hades/admin/tenant/application/get/get-tenants.query';
import { DeleteTenantsCommand } from '@hades/admin/tenant/application/delete/delete-tenants.command';

@Resolver()
export class DeleteTenantsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteTenants')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const tenants = await this.queryBus.ask(new GetTenantsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteTenantsCommand(queryStatements));

        return tenants;
    }
}