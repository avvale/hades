import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { Operator } from '@hades/shared/domain/persistence/sql-statement/operator';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetTenantsQuery } from '@hades/iam/tenant/application/get/get-tenants.query';
import { DeleteTenantsCommand } from '@hades/iam/tenant/application/delete/delete-tenants.command';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { Utils } from '@hades/iam/account/domain/lib/utils';

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

        // create or statement for get all accounts where delete tenant
        const orStatements = [];
        for ( const tenant of tenants)
        {
            orStatements.push({
                dTenants: {
                    [Operator.substring]: tenant.id
                }
            });
        }

        // get all accounts where delete any tenant
        const accountsToRemoveAnyTenant = await this.queryBus.ask(new GetAccountsQuery({ 
            where: {
                [Operator.or]: orStatements
            }
        }));

        // delete tenant, only update account if tenantId exist in dTenants column
        for ( const tenant of tenants)
        {
            await Utils.deleteTenantFromAccounts(this.commandBus, tenant.id, accountsToRemoveAnyTenant);
        }

        await this.commandBus.dispatch(new DeleteTenantsCommand(queryStatement));

        return tenants;
    }
}