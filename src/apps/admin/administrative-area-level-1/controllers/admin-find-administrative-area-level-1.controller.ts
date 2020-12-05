import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AdministrativeAreaLevel1Dto } from './../dto/administrative-area-level-1.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAdministrativeAreaLevel1Query } from '@hades/admin/administrative-area-level-1/application/find/find-administrative-area-level-1.query';

@ApiTags('[admin] administrative-area-level-1')
@Controller('admin/administrative-area-level-1')
@Permissions('admin.administrativeAreaLevel1.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminFindAdministrativeAreaLevel1Controller
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find administrative-area-level-1 according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AdministrativeAreaLevel1Dto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel1Query(queryStatement, constraint, { timezone }));
    }
}