import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateAttachmentFamilyDto } from './../dto/create-attachment-family.dto';
import { AttachmentFamilyDto } from './../dto/attachment-family.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAttachmentFamilyByIdQuery } from '@hades/admin/attachment-family/application/find/find-attachment-family-by-id.query';
import { CreateAttachmentFamilyCommand } from '@hades/admin/attachment-family/application/create/create-attachment-family.command';

@ApiTags('[admin] attachment-family')
@Controller('admin/attachment-family')
@Permissions('admin.attachmentFamily.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAttachmentFamilyController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create attachment-family' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AttachmentFamilyDto })
    async main(
        @Body() payload: CreateAttachmentFamilyDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAttachmentFamilyCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindAttachmentFamilyByIdQuery(payload.id, {}, { timezone }));
    }
}