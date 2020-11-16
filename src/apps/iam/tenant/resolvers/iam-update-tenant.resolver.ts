import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateTenantCommand } from '@hades/iam/tenant/application/update/update-tenant.command';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';
import { IamUpdateTenantInput } from './../../../../graphql';

// custom
import { Operator } from '@hades/shared/domain/persistence/sql-statement/operator';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { Utils } from '@hades/iam/account/domain/lib/utils';

@Resolver()
@Permissions('iam.tenant.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateTenantResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamUpdateTenant')
    async main(
        @Args('payload') payload: IamUpdateTenantInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const accountsToAdd = await this.queryBus.ask(new GetAccountsQuery({
            where: {
                id: payload.accountIds
            }
        }, constraint, { timezone }));

        // add tenant to accounts
        for (const account of accountsToAdd)
        {
            const currentTenants = account.dTenants;

            // check if account has this tenant
            if (currentTenants.indexOf(payload.id) === -1)
            {
                // add tenant and update account
                currentTenants.push(payload.id);
                await this.commandBus.dispatch(new UpdateAccountCommand({
                    id: account.id,
                    type: undefined,
                    email: undefined,
                    isActive: undefined,
                    clientId: undefined,
                    dApplicationCodes: undefined,
                    dPermissions: undefined,
                    data: undefined,
                    roleIds: undefined,
                    tenantIds: currentTenants
                }, constraint, { timezone }));
            }
        }

        // get accounts to remove tenant
        const accountsToRemoveTenant = await this.queryBus.ask(new GetAccountsQuery({
            where: {
                dTenants: {
                    [Operator.substring]: payload.id
                },
                id: {
                    [Operator.notIn]: accountsToAdd.map(account => account.id)
                }
            }
        }, constraint, { timezone }));

        await Utils.deleteTenantFromAccounts(this.commandBus, payload.id, accountsToRemoveTenant, constraint, { timezone });

        // update tenant
        await this.commandBus.dispatch(new UpdateTenantCommand({
            id: payload.id,
            name: payload.name,
            code: payload.code,
            logo: payload.logo,
            isActive: payload.isActive,
            data: payload.data,
            accountIds: payload.accountIds,
        }, constraint, { timezone }));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, constraint, { timezone }));
    }
}