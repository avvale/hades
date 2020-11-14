import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

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
import { FindAttachmentFamilyByIdQuery } from '@hades/admin/attachment-family/application/find/find-attachment-family-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { AdminAttachmentFamily } from './../../../../graphql';

@Resolver()
@Permissions('admin.attachmentFamily.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminFindAttachmentFamilyByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('adminFindAttachmentFamilyById')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AdminAttachmentFamily>
    {
        return await this.queryBus.ask(new FindAttachmentFamilyByIdQuery(id, constraint, { timezone }));
    }
}