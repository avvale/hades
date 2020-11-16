import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateAttachmentDto } from './../dto/create-attachment.dto';
import { AttachmentDto } from './../dto/attachment.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

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
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateAttachmentDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAttachmentCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindAttachmentByIdQuery(payload.id, {}, { timezone }));
    }
}