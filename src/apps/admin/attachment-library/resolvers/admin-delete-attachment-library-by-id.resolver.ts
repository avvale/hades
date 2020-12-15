import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAttachmentLibraryByIdQuery } from '@hades/admin/attachment-library/application/find/find-attachment-library-by-id.query';
import { DeleteAttachmentLibraryByIdCommand } from '@hades/admin/attachment-library/application/delete/delete-attachment-library-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('admin.attachmentLibrary.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAttachmentLibraryByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminDeleteAttachmentLibraryById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const attachmentLibrary = await this.queryBus.ask(new FindAttachmentLibraryByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAttachmentLibraryByIdCommand(id, constraint, { timezone }));

        return attachmentLibrary;
    }
}