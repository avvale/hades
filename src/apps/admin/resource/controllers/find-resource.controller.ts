import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResourceDto } from './../dto/resource.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindResourceQuery } from '@hades/admin/resource/application/find/find-resource.query';

@ApiTags('[admin] resource')
@ApiOkResponse({ description: 'The record has been successfully created.', type: ResourceDto})
@Controller('admin/resource')
export class FindResourceController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find resource according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindResourceQuery(queryStatements));   
    }
}