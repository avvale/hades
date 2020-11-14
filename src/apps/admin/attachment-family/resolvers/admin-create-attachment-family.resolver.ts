import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateAttachmentFamilyCommand } from '@hades/admin/attachment-family/application/create/create-attachment-family.command';
import { FindAttachmentFamilyByIdQuery } from '@hades/admin/attachment-family/application/find/find-attachment-family-by-id.query';
import { AdminCreateAttachmentFamilyInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.attachmentFamily.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAttachmentFamilyResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminCreateAttachmentFamily')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: AdminCreateAttachmentFamilyInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAttachmentFamilyCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindAttachmentFamilyByIdQuery(payload.id, {}, { timezone }));
    }
}