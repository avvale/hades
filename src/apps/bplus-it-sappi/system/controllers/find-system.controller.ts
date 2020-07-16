import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindSystemQuery } from '@hades/bplus-it-sappi/system/application/find/find-system.query';

@ApiTags('[bplus-it-sappi] system')
@Controller('bplus-it-sappi/system')
export class FindSystemController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find system according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: SystemDto })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindSystemQuery(queryStatements));   
    }
}