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
import { GetAttachmentsQuery } from '@hades/admin/attachment/application/get/get-attachments.query';
import { AdminAttachment } from './../../../../graphql';

@Resolver()
@Permissions('admin.attachment.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminGetAttachmentsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('adminGetAttachments')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AdminAttachment[]>
    {
        return await this.queryBus.ask(new GetAttachmentsQuery(queryStatement, constraint, { timezone }));
    }
}