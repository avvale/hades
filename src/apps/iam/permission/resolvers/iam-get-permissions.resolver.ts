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
import { GetPermissionsQuery } from '@hades/iam/permission/application/get/get-permissions.query';
import { IamPermission } from './../../../../graphql';

@Resolver()
@Permissions('iam.permission.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamGetPermissionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamGetPermissions')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission[]>
    {
        return await this.queryBus.ask(new GetPermissionsQuery(queryStatement, constraint, { timezone }));
    }
}