import { Controller, Get, Render } from '@nestjs/common';
import { IQueryBus } from '@nestjs/cqrs';

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