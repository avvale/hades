import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LangDto } from './../dto/lang.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';

@ApiTags('[admin] lang')
@ApiOkResponse({ description: 'The records has been found successfully.', type: LangDto})
@Controller('admin/langs')
export class GetLangsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find langs according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetLangsQuery(queryStatements));   
    }
}