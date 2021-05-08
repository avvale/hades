import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateAdministrativeAreasLevel1Query } from '@hades/admin/administrative-area-level-1/application/paginate/paginate-administrative-areas-level-1.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
@Permissions('admin.administrativeAreaLevel1.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminPaginateAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('adminPaginateAdministrativeAreasLevel1')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateAdministrativeAreasLevel1Query(queryStatement, constraint, { timezone }));
    }
}