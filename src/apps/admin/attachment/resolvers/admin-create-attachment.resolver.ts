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
import { CreateAttachmentCommand } from '@hades/admin/attachment/application/create/create-attachment.command';
import { FindAttachmentByIdQuery } from '@hades/admin/attachment/application/find/find-attachment-by-id.query';
import { AdminCreateAttachmentInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.attachment.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAttachmentResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminCreateAttachment')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: AdminCreateAttachmentInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAttachmentCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindAttachmentByIdQuery(payload.id, {}, { timezone }));
    }
}