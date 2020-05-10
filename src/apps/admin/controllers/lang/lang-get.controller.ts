import { Controller, Body, Get } from '@nestjs/common';

// @hades
import { IQueryBus } from './../../../../@hades/shared/domain/bus/query-bus.service';
import { FindLangsQuery } from 'src/@hades/admin/lang/application/find/find-langs.query';

@Controller('admin/lang')
export class LangGetController 
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    async main(@Body() payload: any)
    {
       return await this.queryBus.ask(new FindLangsQuery());
    }
}