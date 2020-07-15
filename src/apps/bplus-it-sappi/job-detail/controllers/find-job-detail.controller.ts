import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { JobDetailDto } from './../dto/job-detail.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindJobDetailQuery } from '@hades/bplus-it-sappi/job-detail/application/find/find-job-detail.query';

@ApiTags('[bplus-it-sappi] job-detail')
@Controller('bplus-it-sappi/job-detail')
export class FindJobDetailController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find job-detail according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: JobDetailDto })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindJobDetailQuery(queryStatements));   
    }
}