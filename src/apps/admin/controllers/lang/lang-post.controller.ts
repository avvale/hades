import { Controller, Post, Body, Get } from '@nestjs/common';

// @hades
import { CreateLangCommand } from './../../../../@hades/admin/lang/application/create/create-lang.command';
import { ICommandBus } from './../../../../@hades/shared/domain/bus/command-bus.service';

@Controller('admin/lang')
export class LangPostController 
{
    constructor(
        private readonly commandBus: ICommandBus
    ) {}

    @Post()
    main(@Body() payload: any)
    {
        return this.commandBus.dispatch(new CreateLangCommand(
            payload.id, 
            payload.name,
            payload.image,
            payload.iso6392,
            payload.iso6393,
            payload.ietf,
            payload.sort,
            payload.isActive,
            payload.createdAt,
            payload.updatedAt,
            payload.deletedAt,
        ));
    }
}