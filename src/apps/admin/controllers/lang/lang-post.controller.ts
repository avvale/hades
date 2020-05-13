import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateLangDto } from './../../dto/create-lang.dto';
import { LangDto } from './../../dto/lang.dto';

// @hades
import { CreateLangCommand } from './../../../../@hades/admin/lang/application/create/create-lang.command';
import { ICommandBus } from './../../../../@hades/shared/domain/bus/command-bus.service';

@ApiTags('lang')
@ApiCreatedResponse({ description: 'The record has been successfully created.', type: LangDto})
@Controller('admin/lang')
export class LangPostController 
{
    constructor(
        private readonly commandBus: ICommandBus
    ) {}

    @Post()
    main(@Body() payload: CreateLangDto)
    {
        this.commandBus.dispatch(new CreateLangCommand(
            payload.id, 
            payload.name,
            payload.image,
            payload.iso6392,
            payload.iso6393,
            payload.ietf,
            payload.sort,
            payload.isActive
        ));
    }
}