import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetPermissionsQuery } from '@hades/iam/permission/application/get/get-permissions.query';

@ApiTags('[iam] permission')
@Controller('iam/permissions')
export class GetPermissionsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find permissions according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [PermissionDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new GetPermissionsQuery(queryStatement));   
    }
}