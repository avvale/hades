import { Resolver, Args, Mutation } from '@nestjs/graphql';

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
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';

@Resolver()
@Permissions('iam.tenant.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateTenantResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateTenant')
    async main(@Args('payload') payload: IamCreateTenantInput)
    {
        const accounts = await this.queryBus.ask(new GetAccountsQuery({ 
            where: {
                id: payload.accountIds
            }
        }));

        for (const account of accounts)
        {
            const currentTenants = account.dTenants;

            // add new tenan and update account
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
        
        await this.commandBus.dispatch(new CreateTenantCommand(
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