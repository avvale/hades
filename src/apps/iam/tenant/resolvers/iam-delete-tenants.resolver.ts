// ignored file
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeleteTenantsCommand } from '@hades/iam/tenant/application/delete/delete-tenants.command';
import { GetTenantsQuery } from '@hades/iam/tenant/application/get/get-tenants.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

// custom
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { Operator } from '@hades/shared/domain/persistence/sql-statement/operator';
import { Utils } from '@hades/iam/account/domain/lib/utils';

@Resolver()
@Permissions('iam.tenant.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteTenantsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeleteTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const tenants = await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));

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
        }, constraint, { timezone }));

        // delete tenant, only update account if tenantId exist in dTenants column
        for ( const tenant of tenants)
        {
            await Utils.deleteTenantFromAccounts(this.commandBus, tenant.id, accountsToRemoveAnyTenant, constraint, { timezone });
        }

        await this.commandBus.dispatch(new DeleteTenantsCommand(queryStatement, constraint, { timezone }));

        return tenants;
    }
}