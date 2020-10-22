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
import { FindModuleByIdQuery } from '@hades/cci/module/application/find/find-module-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CciModule } from './../../../../graphql';

@Resolver()
@Permissions('cci.module.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindModuleByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindModuleById')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('id') id: string, @Args('constraint') constraint?: QueryStatement, ): Promise<CciModule>
    {
        return await this.queryBus.ask(new FindModuleByIdQuery(id, constraint));
    }
}