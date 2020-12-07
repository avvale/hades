import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AttachmentFamilyDto } from './../dto/attachment-family.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAttachmentFamilyByIdQuery } from '@hades/admin/attachment-family/application/find/find-attachment-family-by-id.query';

@ApiTags('[admin] attachment-family')
@Controller('admin/attachment-family')
@Permissions('admin.attachmentFamily.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminFindAttachmentFamilyByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find attachment-family by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AttachmentFamilyDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindAttachmentFamilyByIdQuery(id, constraint, { timezone }));
    }
}