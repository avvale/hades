import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetTenantsQuery } from '@hades/iam/tenant/application/get/get-tenants.query';
import { IamTenant } from './../../../../graphql';

@Resolver()
@Permissions('iam.tenant.get')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class GetTenantsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamGetTenants')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamTenant[]>
    {
        return await this.queryBus.ask(new GetTenantsQuery(queryStatement));
    }
}