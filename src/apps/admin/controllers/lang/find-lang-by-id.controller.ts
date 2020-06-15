import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LangDto } from './../../dto/lang.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';

@ApiTags('lang')
@ApiOkResponse({ description: 'The record has been found successfully.', type: LangDto})
@Controller('admin/lang')
export class FindLangByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindLangByIdQuery(id));
    }
}