import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateAttachmentDto } from './../dto/create-attachment.dto';
import { AttachmentDto } from './../dto/attachment.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAttachmentByIdQuery } from '@hades/admin/attachment/application/find/find-attachment-by-id.query';
import { CreateAttachmentCommand } from '@hades/admin/attachment/application/create/create-attachment.command';

@ApiTags('[admin] attachment')
@Controller('admin/attachment')
@Permissions('admin.attachment.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAttachmentController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create attachment' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AttachmentDto })
    async main(
        @Body() payload: CreateAttachmentDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAttachmentCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindAttachmentByIdQuery(payload.id, {}, { timezone }));
    }
}