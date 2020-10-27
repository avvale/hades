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
import { FindRoleByIdQuery } from '@hades/cci/role/application/find/find-role-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CciRole } from './../../../../graphql';

@Resolver()
@Permissions('cci.role.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindRoleByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindRoleById')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('id') id: string, @Args('constraint') constraint?: QueryStatement, ): Promise<CciRole>
    {
        return await this.queryBus.ask(new FindRoleByIdQuery(id, constraint));
    }
}