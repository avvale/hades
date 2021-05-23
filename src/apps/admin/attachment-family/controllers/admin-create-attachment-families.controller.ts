import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AttachmentFamilyDto } from './../dto/attachment-family.dto';
import { CreateAttachmentFamilyDto } from './../dto/create-attachment-family.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAttachmentFamiliesCommand } from '@hades/admin/attachment-family/application/create/create-attachment-families.command';

@ApiTags('[admin] attachment-family')
@Controller('admin/attachment-families')
@Permissions('admin.attachmentFamily.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAttachmentFamiliesController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create attachment-families in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AttachmentFamilyDto] })
    @ApiBody({ type: [CreateAttachmentFamilyDto] })
    async main(
        @Body() payload: CreateAttachmentFamilyDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAttachmentFamiliesCommand(payload, { timezone }));
    }
}