import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAdministrativeAreaLevel3ByIdQuery } from '@hades/admin/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { AdminAdministrativeAreaLevel3 } from './../../../../graphql';

@Resolver()
@Permissions('admin.administrativeAreaLevel3.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminFindAdministrativeAreaLevel3ByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('adminFindAdministrativeAreaLevel3ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AdminAdministrativeAreaLevel3>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(id, constraint, { timezone }));
    }
}