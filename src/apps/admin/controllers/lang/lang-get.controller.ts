import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LangDto } from './../../dto/lang.dto';

// @hades
import { IQueryBus } from './../../../../@hades/shared/domain/bus/query-bus.service';
import { FindLangsQuery } from './../../../../@hades/admin/lang/application/find/find-langs.query';

@ApiTags('lang')
@ApiOkResponse({ description: 'The record has been successfully created.', type: LangDto})
@Controller('admin/lang')
export class LangGetController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    async main()
    {
       return await this.queryBus.ask(new FindLangsQuery());
    }
}