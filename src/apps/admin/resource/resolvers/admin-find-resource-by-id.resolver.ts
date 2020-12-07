import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { AdminResource } from './../../../../graphql';

@Resolver()
@Permissions('admin.resource.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminFindResourceByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('adminFindResourceById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AdminResource>
    {
        return await this.queryBus.ask(new FindResourceByIdQuery(id, constraint, { timezone }));
    }
}