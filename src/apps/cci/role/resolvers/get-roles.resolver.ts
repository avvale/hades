import { Resolver, Args, Query } from '@nestjs/graphql';

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
import { GetRolesQuery } from '@hades/cci/role/application/get/get-roles.query';
import { CciRole } from './../../../../graphql';

@Resolver()
@Permissions('cci.role.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class GetRolesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetRoles')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, ): Promise<CciRole[]>
    {
        return await this.queryBus.ask(new GetRolesQuery(queryStatement, constraint));
    }
}