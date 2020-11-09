import { Controller, Get, Render } from '@nestjs/common';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';

@Controller('iam/account')
export class IndexController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @Render('index')
    async main()
    {
        return { message: 'Hello world!' };
    }
}