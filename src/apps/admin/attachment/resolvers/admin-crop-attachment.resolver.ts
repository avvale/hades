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
import { CreateAttachmentCommand } from '@hades/admin/attachment/application/create/create-attachment.command';
import { FindAttachmentByIdQuery } from '@hades/admin/attachment/application/find/find-attachment-by-id.query';
import { AdminCreateAttachmentFamilyInput, AdminCropAttachmentInput, AdminCropInput } from './../../../../graphql';


@Resolver()
//@Permissions('admin.attachment.create')
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
        console.log(crop);
        console.log(attachmentFamily);
        console.log(attachment);



       //await this.commandBus.dispatch(new CreateAttachmentCommand(payload, { timezone }));

        //return await this.queryBus.ask(new FindAttachmentByIdQuery(payload.id, {}, { timezone }));
    }
}