import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetModulesQuery } from '@hades/bplus-it-sappi/module/application/get/get-modules.query';

@ApiTags('[bplus-it-sappi] module')
@Controller('bplus-it-sappi/modules')
export class GetModulesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find modules according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [ModuleDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetModulesQuery(queryStatements));   
    }
}