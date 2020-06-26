import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetModulesQuery } from '@hades/admin/module/application/get/get-modules.query';

@ApiTags('module')
@ApiOkResponse({ description: 'The records has been found successfully.', type: ModuleDto})
@Controller('admin/modules')
export class GetModulesController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetModulesQuery(queryStatements));   
    }
}