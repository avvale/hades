import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

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
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AdminCountry[]>
    {
        return await this.queryBus.ask(new GetCountriesQuery(queryStatement, constraint, { timezone }));
    }
}