import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetTenantsQuery } from '@hades/iam/tenant/application/get/get-tenants.query';
import { DeleteTenantsCommand } from '@hades/iam/tenant/application/delete/delete-tenants.command';

@Resolver()
export class DeleteTenantsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteTenants')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const tenants = await this.queryBus.ask(new GetTenantsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteTenantsCommand(queryStatement));

        return tenants;
    }
}