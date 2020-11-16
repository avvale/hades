import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TenantDto } from './../dto/tenant.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateTenantsQuery } from '@hades/iam/tenant/application/paginate/paginate-tenants.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/paginate')
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamPaginateTenantsController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate tenants' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new PaginateTenantsQuery(queryStatement, constraint, { timezone }));
    }
}