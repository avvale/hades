import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateModulesQuery } from '@hades/admin/module/application/paginate/paginate-modules.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('module')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: ModuleDto})
@Controller('admin/modules/paginate')
export class PaginateModulesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateModulesQuery(queryStatements, constraint));   
    }
}