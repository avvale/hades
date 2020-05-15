import { Controller, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LangDto } from './../../dto/lang.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindLangQuery } from '@hades/admin/lang/application/find/find-lang.query';
import { QueryStatementInput } from './../../../../graphql';

@ApiTags('lang')
@ApiOkResponse({ description: 'The record has been successfully created.', type: LangDto})
@Controller('admin/lang')
export class LangGetController 
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