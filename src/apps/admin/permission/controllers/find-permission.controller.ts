import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindPermissionQuery } from '@hades/admin/permission/application/find/find-permission.query';

@ApiTags('[admin] permission')
@ApiOkResponse({ description: 'The record has been successfully created.', type: PermissionDto})
@Controller('admin/permission')
export class FindPermissionController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find permission according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindPermissionQuery(queryStatements));   
    }
}