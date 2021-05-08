import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTenantQuery } from '@hades/iam/tenant/application/find/find-tenant.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IamTenant } from './../../../../graphql';

@Resolver()
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindTenantResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamFindTenant')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.queryBus.ask(new FindTenantQuery(queryStatement, constraint, { timezone }));
    }
}