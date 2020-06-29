import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JobDto } from './../dto/job.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindJobQuery } from '@hades/bplus-it-sappi/job/application/find/find-job.query';

@ApiTags('[bplus-it-sappi] job')
@ApiOkResponse({ description: 'The record has been successfully created.', type: JobDto})
@Controller('bplus-it-sappi/job')
export class FindJobController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find job according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindJobQuery(queryStatements));   
    }
}