import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetModulesQuery } from '@hades/bplus-it-sappi/module/application/get/get-modules.query';

@ApiTags('[bplus-it-sappi] module')
@ApiOkResponse({ description: 'The records has been found successfully.', type: ModuleDto})
@Controller('bplus-it-sappi/modules')
export class GetModulesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find modules according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetModulesQuery(queryStatements));   
    }
}