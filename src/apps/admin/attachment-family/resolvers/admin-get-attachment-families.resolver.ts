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
import { GetAttachmentFamiliesQuery } from '@hades/admin/attachment-family/application/get/get-attachment-families.query';
import { AdminAttachmentFamily } from './../../../../graphql';

@Resolver()
@Permissions('admin.attachmentFamily.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminGetAttachmentFamiliesResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('adminGetAttachmentFamilies')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AdminAttachmentFamily[]>
    {
        return await this.queryBus.ask(new GetAttachmentFamiliesQuery(queryStatement, constraint, { timezone }));
    }
}