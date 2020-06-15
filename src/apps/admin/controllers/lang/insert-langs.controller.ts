import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateLangDto } from './../../dto/create-lang.dto';
import { LangDto } from './../../dto/lang.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';
import { InsertLangsCommand } from '@hades/admin/lang/application/insert/insert-langs.command';

@ApiTags('lang')
@ApiCreatedResponse({ description: 'The records has been created successfully.', type: LangDto})
@Controller('admin/langs')
export class InsertLangsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    async main(@Body() payload: CreateLangDto[])
    {
        await this.commandBus.dispatch(new InsertLangsCommand(payload));

        // TODO crear consulta para obtener todos las entidades de ids recien enviados
        // return await this.queryBus.ask(new FindLangByIdQuery(payload.id));
        return [];
    }
}