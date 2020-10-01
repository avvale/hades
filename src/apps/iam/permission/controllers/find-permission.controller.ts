import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindPermissionQuery } from '@hades/iam/permission/application/find/find-permission.query';

@ApiTags('[iam] permission')
@Controller('iam/permission')
export class FindPermissionController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find permission according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: PermissionDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new FindPermissionQuery(queryStatement));   
    }
}