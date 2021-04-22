// ignored file
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
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';
import { DeleteTenantByIdCommand } from '@hades/iam/tenant/application/delete/delete-tenant-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';


// custom
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { Operator } from '@hades/shared/domain/persistence/sql-statement/operator';
import { Utils } from '@hades/iam/account/domain/lib/utils';

@Resolver()
@Permissions('iam.tenant.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteTenantByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeleteTenantById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const tenant = await this.queryBus.ask(new FindTenantByIdQuery(id, constraint, { timezone }));

        const accountsToRemoveTenant = await this.queryBus.ask(new GetAccountsQuery({
            where: {
                dTenants: {
                    [Operator.substring]: tenant.id
                }
            }
        }, undefined, { timezone }));

        await Utils.deleteTenantFromAccounts(this.commandBus, tenant.id, accountsToRemoveTenant, constraint, { timezone });

        await this.commandBus.dispatch(new DeleteTenantByIdCommand(id, constraint, { timezone }));

        return tenant;
    }
}