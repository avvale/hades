import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AdministrativeAreaLevel3Dto } from './../dto/administrative-area-level-3.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAdministrativeAreasLevel3Query } from '@hades/admin/administrative-area-level-3/application/get/get-administrative-areas-level-3.query';

@ApiTags('[admin] administrative-area-level-3')
@Controller('admin/administrative-areas-level-3')
@Permissions('admin.administrativeAreaLevel3.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminGetAdministrativeAreasLevel3Controller
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find administrative-areas-level-3 according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AdministrativeAreaLevel3Dto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetAdministrativeAreasLevel3Query(queryStatement, constraint, { timezone }));
    }
}