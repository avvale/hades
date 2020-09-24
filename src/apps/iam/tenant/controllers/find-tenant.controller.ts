import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { TenantDto } from './../dto/tenant.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindTenantQuery } from '@hades/iam/tenant/application/find/find-tenant.query';

@ApiTags('[iam] tenant')
@Controller('iam/tenant')
export class FindTenantController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find tenant according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: TenantDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new FindTenantQuery(queryStatement));   
    }
}