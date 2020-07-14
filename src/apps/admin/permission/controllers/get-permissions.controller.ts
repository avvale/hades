import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetPermissionsQuery } from '@hades/admin/permission/application/get/get-permissions.query';

@ApiTags('[admin] permission')
@ApiOkResponse({ description: 'The records has been found successfully.', type: PermissionDto})
@Controller('admin/permissions')
export class GetPermissionsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find permissions according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetPermissionsQuery(queryStatements));   
    }
}