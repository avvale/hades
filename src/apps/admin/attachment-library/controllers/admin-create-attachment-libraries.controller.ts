import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AttachmentLibraryDto } from './../dto/attachment-library.dto';
import { CreateAttachmentLibraryDto } from './../dto/create-attachment-library.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAttachmentLibrariesCommand } from '@hades/admin/attachment-library/application/create/create-attachment-libraries.command';

@ApiTags('[admin] attachment-library')
@Controller('admin/attachment-libraries')
@Permissions('admin.attachmentLibrary.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAttachmentLibrariesController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create attachment-libraries in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AttachmentLibraryDto] })
    @ApiBody({ type: [CreateAttachmentLibraryDto] })
    async main(
        @Body() payload: CreateAttachmentLibraryDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAttachmentLibrariesCommand(payload, { timezone }));
    }
}