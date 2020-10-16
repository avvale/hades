import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LangDto } from './../dto/lang.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';

@ApiTags('[admin] lang')
@Controller('admin/lang')
@UseGuards(AuthGuard('jwt'))
export class FindLangByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find lang by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: LangDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindLangByIdQuery(id));
    }
}