import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateModulesQuery } from '@hades/bplus-it-sappi/module/application/paginate/paginate-modules.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[bplus-it-sappi] module')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: ModuleDto})
@Controller('bplus-it-sappi/modules/paginate')
export class PaginateModulesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate modules' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateModulesQuery(queryStatements, constraint));   
    }
}