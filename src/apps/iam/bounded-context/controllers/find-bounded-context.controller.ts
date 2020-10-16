import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindBoundedContextQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context.query';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context')
@UseGuards(AuthGuard('jwt'))
export class FindBoundedContextController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find bounded-context according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: BoundedContextDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new FindBoundedContextQuery(queryStatement));   
    }
}