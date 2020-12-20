import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAttachmentLibraryQuery } from '@hades/admin/attachment-library/application/find/find-attachment-library.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { AdminAttachmentLibrary } from './../../../../graphql';

@Resolver()
@Permissions('admin.attachmentLibrary.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminFindAttachmentLibraryResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('adminFindAttachmentLibrary')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AdminAttachmentLibrary>
    {
        return await this.queryBus.ask(new FindAttachmentLibraryQuery(queryStatement, constraint, { timezone }));
    }
}