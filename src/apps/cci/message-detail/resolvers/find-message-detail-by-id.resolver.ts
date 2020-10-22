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
import { FindMessageDetailByIdQuery } from '@hades/cci/message-detail/application/find/find-message-detail-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CciMessageDetail } from './../../../../graphql';

@Resolver()
@Permissions('cci.messageDetail.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindMessageDetailByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindMessageDetailById')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('id') id: string, @Args('constraint') constraint?: QueryStatement, ): Promise<CciMessageDetail>
    {
        return await this.queryBus.ask(new FindMessageDetailByIdQuery(id, constraint));
    }
}