import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateAttachmentFamilyDto } from './../dto/update-attachment-family.dto';
import { AttachmentFamilyDto } from './../dto/attachment-family.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateAttachmentFamilyCommand } from '@hades/admin/attachment-family/application/update/update-attachment-family.command';
import { FindAttachmentFamilyByIdQuery } from '@hades/admin/attachment-family/application/find/find-attachment-family-by-id.query';

@ApiTags('[admin] attachment-family')
@Controller('admin/attachment-family')
@Permissions('admin.attachmentFamily.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminUpdateAttachmentFamilyController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update attachment-family' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AttachmentFamilyDto})
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: UpdateAttachmentFamilyDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAttachmentFamilyCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAttachmentFamilyByIdQuery(payload.id, constraint, { timezone }));
    }
}