import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetCountriesQuery } from '@hades/admin/country/application/get/get-countries.query';
import { AdminCountry } from './../../../../graphql';

@Resolver()
@Permissions('admin.country.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminGetCountriesResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('adminGetCountries')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AdminCountry[]>
    {
        return await this.queryBus.ask(new GetCountriesQuery(queryStatement, constraint, { timezone }));
    }
}