import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindBoundedContextQuery } from '@hades/admin/bounded-context/application/find/find-bounded-context.query';

@ApiTags('[admin] bounded-context')
@ApiOkResponse({ description: 'The record has been successfully created.', type: BoundedContextDto})
@Controller('admin/bounded-context')
export class FindBoundedContextController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find bounded-context according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindBoundedContextQuery(queryStatements));   
    }
}