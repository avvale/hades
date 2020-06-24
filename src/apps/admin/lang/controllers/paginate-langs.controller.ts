import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LangDto } from './../../dto/lang/lang.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateLangsQuery } from '@hades/admin/lang/application/paginate/paginate-langs.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('lang')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: LangDto})
@Controller('admin/langs/paginate')
export class PaginateLangsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateLangsQuery(queryStatements, constraint));   
    }
}