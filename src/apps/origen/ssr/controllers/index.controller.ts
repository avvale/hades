import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class IndexController
{
    @Get()
    @Render('index.hbs')
    root()
    {
        return { message: 'Hello world!' };
    }
}