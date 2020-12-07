import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AttachmentDto } from './../dto/attachment.dto';
import { CreateAttachmentDto } from './../dto/create-attachment.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAttachmentsCommand } from '@hades/admin/attachment/application/create/create-attachments.command';

@ApiTags('[admin] attachment')
@Controller('admin/attachments')
@Permissions('admin.attachment.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAttachmentsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create attachments in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AttachmentDto] })
    @ApiBody({ type: [CreateAttachmentDto] })
    async main(
        @Body() payload: CreateAttachmentDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAttachmentsCommand(payload, { timezone }));
    }
}