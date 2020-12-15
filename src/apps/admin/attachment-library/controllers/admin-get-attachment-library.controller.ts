import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AttachmentLibraryDto } from './../dto/attachment-library.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAttachmentLibraryQuery } from '@hades/admin/attachment-library/application/get/get-attachment-library.query';

@ApiTags('[admin] attachment-library')
@Controller('admin/attachment-library')
@Permissions('admin.attachmentLibrary.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminGetAttachmentLibraryController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find attachment-library according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AttachmentLibraryDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetAttachmentLibraryQuery(queryStatement, constraint, { timezone }));
    }
}