import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { Operator } from '@hades/shared/domain/persistence/sql-statement/operator';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';
import { DeleteTenantByIdCommand } from '@hades/iam/tenant/application/delete/delete-tenant-by-id.command';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { Utils } from '@hades/iam/account/domain/lib/utils';

@Resolver()
export class DeleteTenantByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteTenantById')
    async main(@Args('id') id: string)
    {
        const tenant = await this.queryBus.ask(new FindTenantByIdQuery(id));

        const accountsToRemoveTenant = await this.queryBus.ask(new GetAccountsQuery({ 
            where: {
                dTenants: {
                    [Operator.substring]: tenant.id
                }
            }
        }));

        await Utils.deleteTenantFromAccounts(this.commandBus, tenant.id, accountsToRemoveTenant);

        await this.commandBus.dispatch(new DeleteTenantByIdCommand(id));

        return tenant;
    }
}