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
import { DeleteAttachmentLibraryCommand } from '@hades/admin/attachment-library/application/delete/delete-attachment-library.command';
import { GetAttachmentLibraryQuery } from '@hades/admin/attachment-library/application/get/get-attachment-library.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('admin.attachmentLibrary.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAttachmentLibraryResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminDeleteAttachmentLibrary')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const attachmentLibrary = await this.queryBus.ask(new GetAttachmentLibraryQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAttachmentLibraryCommand(queryStatement, constraint, { timezone }));

        return attachmentLibrary;
    }
}