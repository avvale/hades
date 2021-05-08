import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateAttachmentLibraryCommand } from '@hades/admin/attachment-library/application/update/update-attachment-library.command';
import { FindAttachmentLibraryByIdQuery } from '@hades/admin/attachment-library/application/find/find-attachment-library-by-id.query';
import { AdminUpdateAttachmentLibraryInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.attachmentLibrary.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminUpdateAttachmentLibraryResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminUpdateAttachmentLibrary')
    async main(
        @Args('payload') payload: AdminUpdateAttachmentLibraryInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAttachmentLibraryCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAttachmentLibraryByIdQuery(payload.id, constraint, { timezone }));
    }
}