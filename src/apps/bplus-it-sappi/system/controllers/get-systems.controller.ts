import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSystemsQuery } from '@hades/bplus-it-sappi/system/application/get/get-systems.query';

@ApiTags('[bplus-it-sappi] system')
@ApiOkResponse({ description: 'The records has been found successfully.', type: SystemDto})
@Controller('bplus-it-sappi/systems')
export class GetSystemsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find systems according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetSystemsQuery(queryStatements));   
    }
}