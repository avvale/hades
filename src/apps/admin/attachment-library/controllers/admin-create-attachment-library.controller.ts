import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateAttachmentLibraryDto } from './../dto/create-attachment-library.dto';
import { AttachmentLibraryDto } from './../dto/attachment-library.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAttachmentLibraryByIdQuery } from '@hades/admin/attachment-library/application/find/find-attachment-library-by-id.query';
import { CreateAttachmentLibraryCommand } from '@hades/admin/attachment-library/application/create/create-attachment-library.command';

@ApiTags('[admin] attachment-library')
@Controller('admin/attachment-library')
@Permissions('admin.attachmentLibrary.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAttachmentLibraryController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create attachment-library' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AttachmentLibraryDto })
    async main(
        @Body() payload: CreateAttachmentLibraryDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAttachmentLibraryCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindAttachmentLibraryByIdQuery(payload.id, {}, { timezone }));
    }
}