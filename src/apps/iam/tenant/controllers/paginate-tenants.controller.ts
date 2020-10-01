import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TenantDto } from './../dto/tenant.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateTenantsQuery } from '@hades/iam/tenant/application/paginate/paginate-tenants.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/paginate')
export class PaginateTenantsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate tenants' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement, @Body('constraint') constraint?: QueryStatement)
    {
        return await this.queryBus.ask(new PaginateTenantsQuery(queryStatement, constraint));   
    }
}