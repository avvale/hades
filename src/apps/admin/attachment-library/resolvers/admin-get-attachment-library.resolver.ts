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
import { GetAttachmentLibraryQuery } from '@hades/admin/attachment-library/application/get/get-attachment-library.query';
import { AdminAttachmentLibrary } from './../../../../graphql';

@Resolver()
@Permissions('admin.attachmentLibrary.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminGetAttachmentLibraryResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('adminGetAttachmentLibrary')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AdminAttachmentLibrary[]>
    {
        return await this.queryBus.ask(new GetAttachmentLibraryQuery(queryStatement, constraint, { timezone }));
    }
}