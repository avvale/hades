import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetRolesQuery } from '@hades/iam/role/application/get/get-roles.query';

@ApiTags('[iam] role')
@Controller('iam/roles')
export class GetRolesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find roles according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [RoleDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new GetRolesQuery(queryStatement));   
    }
}