import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AttachmentFamilyDto } from './../dto/attachment-family.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAttachmentFamiliesQuery } from '@hades/admin/attachment-family/application/get/get-attachment-families.query';

@ApiTags('[admin] attachment-family')
@Controller('admin/attachment-families')
@Permissions('admin.attachmentFamily.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminGetAttachmentFamiliesController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find attachment-families according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AttachmentFamilyDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetAttachmentFamiliesQuery(queryStatement, constraint, { timezone }));
    }
}