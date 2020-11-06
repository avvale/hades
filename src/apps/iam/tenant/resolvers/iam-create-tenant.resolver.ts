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
import { CreateTenantCommand } from '@hades/iam/tenant/application/create/create-tenant.command';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';
import { IamCreateTenantInput } from './../../../../graphql';

// custom
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';

@Resolver()
@Permissions('iam.tenant.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateTenantResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateTenant')
    async main(
        @Args('payload') payload: IamCreateTenantInput,
        @Timezone() timezone?: string,
    )
    {
        const accounts = await this.queryBus.ask(new GetAccountsQuery({
            where: {
                id: payload.accountIds
            }
        }, undefined, { timezone }));

        for (const account of accounts)
        {
            const currentTenants = account.dTenants;

            // add new tenan and update account
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
            }, undefined, { timezone }));
        }

        await this.commandBus.dispatch(new CreateTenantCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, {}, { timezone }));
    }
}