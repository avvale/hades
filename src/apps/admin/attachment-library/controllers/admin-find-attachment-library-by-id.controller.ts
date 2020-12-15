import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AttachmentLibraryDto } from './../dto/attachment-library.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAttachmentLibraryByIdQuery } from '@hades/admin/attachment-library/application/find/find-attachment-library-by-id.query';

@ApiTags('[admin] attachment-library')
@Controller('admin/attachment-library')
@Permissions('admin.attachmentLibrary.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminFindAttachmentLibraryByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find attachment-library by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AttachmentLibraryDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindAttachmentLibraryByIdQuery(id, constraint, { timezone }));
    }
}