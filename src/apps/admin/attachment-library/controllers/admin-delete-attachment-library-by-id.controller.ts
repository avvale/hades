import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AttachmentLibraryDto } from './../dto/attachment-library.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAttachmentLibraryByIdQuery } from '@hades/admin/attachment-library/application/find/find-attachment-library-by-id.query';
import { DeleteAttachmentLibraryByIdCommand } from '@hades/admin/attachment-library/application/delete/delete-attachment-library-by-id.command';

@ApiTags('[admin] attachment-library')
@Controller('admin/attachment-library')
@Permissions('admin.attachmentLibrary.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAttachmentLibraryByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete attachment-library by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AttachmentLibraryDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const attachmentLibrary = await this.queryBus.ask(new FindAttachmentLibraryByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAttachmentLibraryByIdCommand(id, constraint, { timezone }));

        return attachmentLibrary;
    }
}