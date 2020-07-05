import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResourceDto } from './../dto/resource.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetResourcesQuery } from '@hades/admin/resource/application/get/get-resources.query';

@ApiTags('[admin] resource')
@ApiOkResponse({ description: 'The records has been found successfully.', type: ResourceDto})
@Controller('admin/resources')
export class GetResourcesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find resources according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetResourcesQuery(queryStatements));   
    }
}