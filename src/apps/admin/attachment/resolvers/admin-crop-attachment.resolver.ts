import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CropAttachmentCommand } from '@hades/admin/attachment/application/crop/crop-attachment.command';
import { AdminCreateAttachmentFamilyInput, AdminCropAttachmentInput, AdminCropInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.attachment.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCropAttachmentResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminCropAttachment')
    async main(
        @Args('crop') crop: AdminCropInput,
        @Args('attachmentFamily') attachmentFamily: AdminCreateAttachmentFamilyInput,
        @Args('attachment') attachment: AdminCropAttachmentInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CropAttachmentCommand(crop, attachmentFamily, attachment, { timezone }));

        console.log(crop, attachmentFamily, attachment)
        attachment.filename;
        attachment.pathname;
        // cogemos el nomnbre del fichero y comprobamos si hay cambio de extensión
    }
}