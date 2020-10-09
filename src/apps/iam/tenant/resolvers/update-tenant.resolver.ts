import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamUpdateTenantInput } from './../../../../graphql';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { Operator } from '@hades/shared/domain/persistence/sql-statement/operator';
import { UpdateTenantCommand } from '@hades/iam/tenant/application/update/update-tenant.command';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { Utils } from '@hades/iam/account/domain/lib/utils';

@Resolver()
@Permissions('iam.tenant.update')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class UpdateTenantResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdateTenant')
    async main(@Args('payload') payload: IamUpdateTenantInput)
    {
        const accountsToAdd = await this.queryBus.ask(new GetAccountsQuery({ 
            where: {
                id: payload.accountIds
            }
        }));

        // add tenant to accounts
        for (const account of accountsToAdd)
        {
            const currentTenants = account.dTenants;

            // check if accoun has this tenant
            if (currentTenants.indexOf(payload.id) === -1) 
            {
                // add tenan and update account
                currentTenants.push(payload.id);
                await this.commandBus.dispatch(new UpdateAccountCommand(
                    account.id,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    currentTenants
                ));
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
        }));

        await Utils.deleteTenantFromAccounts(this.commandBus, payload.id, accountsToRemoveTenant);

        // update tenant
        await this.commandBus.dispatch(new UpdateTenantCommand(
            payload.id,
            payload.name,
            payload.code,
            payload.logo,
            payload.isActive,
            payload.data,
            payload.accountIds,
            
        ));
        
        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id));
    }
}