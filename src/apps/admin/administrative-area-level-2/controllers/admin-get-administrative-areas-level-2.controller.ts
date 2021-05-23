import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAdministrativeAreasLevel2Query } from '@hades/admin/administrative-area-level-2/application/get/get-administrative-areas-level-2.query';

@ApiTags('[admin] administrative-area-level-2')
@Controller('admin/administrative-areas-level-2')
@Permissions('admin.administrativeAreaLevel2.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminGetAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find administrative-areas-level-2 according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AdministrativeAreaLevel2Dto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));
    }
}