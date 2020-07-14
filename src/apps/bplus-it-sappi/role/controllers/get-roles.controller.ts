import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetRolesQuery } from '@hades/bplus-it-sappi/role/application/get/get-roles.query';

@ApiTags('[bplus-it-sappi] role')
@ApiOkResponse({ description: 'The records has been found successfully.', type: RoleDto})
@Controller('bplus-it-sappi/roles')
export class GetRolesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find roles according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetRolesQuery(queryStatements));   
    }
}