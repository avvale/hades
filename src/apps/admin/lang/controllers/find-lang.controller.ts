import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { LangDto } from './../../dto/lang/lang.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindLangQuery } from '@hades/admin/lang/application/find/find-lang.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('lang')
@ApiResponse({ status: 200, description: 'The records has been found successfully.', type: LangDto})
@Controller('admin/lang')
export class FindLangController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindLangQuery(queryStatements));   
    }
}