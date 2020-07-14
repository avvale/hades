import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindRoleQuery } from '@hades/bplus-it-sappi/role/application/find/find-role.query';

@ApiTags('[bplus-it-sappi] role')
@ApiOkResponse({ description: 'The record has been successfully created.', type: RoleDto})
@Controller('bplus-it-sappi/role')
export class FindRoleController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find role according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindRoleQuery(queryStatements));   
    }
}