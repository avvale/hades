import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetTenantsQuery } from '@hades/iam/tenant/application/get/get-tenants.query';
import { IamTenant } from './../../../../graphql';

@Resolver()
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamGetTenantsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamGetTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant[]>
    {
        return await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));
    }
}