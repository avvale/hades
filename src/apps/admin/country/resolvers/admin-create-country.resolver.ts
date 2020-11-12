import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateCountryCommand } from '@hades/admin/country/application/create/create-country.command';
import { FindCountryByIdQuery } from '@hades/admin/country/application/find/find-country-by-id.query';
import { AdminCreateCountryInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.country.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateCountryResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminCreateCountry')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: AdminCreateCountryInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateCountryCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, {}, { timezone }));
    }
}