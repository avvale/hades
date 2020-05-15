import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateLangDto } from '../../dto/create-lang.dto';
import { LangDto } from '../../dto/lang.dto';

// @hades
import { CreateLangCommand } from '@hades/admin/lang/application/create/create-lang.command';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindLangIdQuery } from '@hades/admin/lang/application/find/find-lang-id.query';

@ApiTags('lang')
@ApiCreatedResponse({ description: 'The record has been successfully created.', type: LangDto})
@Controller('admin/lang')
export class CreateLangController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    async main(@Body() payload: CreateLangDto)
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

        return await this.queryBus.ask(new FindLangIdQuery(payload.id));
    }
}