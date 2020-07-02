import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetBoundedContextsQuery } from '@hades/admin/bounded-context/application/get/get-bounded-contexts.query';

@ApiTags('[admin] bounded-context')
@ApiOkResponse({ description: 'The records has been found successfully.', type: BoundedContextDto})
@Controller('admin/bounded-contexts')
export class GetBoundedContextsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find bounded-contexts according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetBoundedContextsQuery(queryStatements));   
    }
}