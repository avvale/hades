import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAdministrativeAreaLevel1ByIdQuery } from '@hades/admin/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { AdminAdministrativeAreaLevel1 } from './../../../../graphql';

@Resolver()
@Permissions('admin.administrativeAreaLevel1.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminFindAdministrativeAreaLevel1ByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('adminFindAdministrativeAreaLevel1ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AdminAdministrativeAreaLevel1>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(id, constraint, { timezone }));
    }
}