import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LangDto } from './../dto/lang.dto';
import { CreateLangDto } from './../dto/create-lang.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertLangsCommand } from '@hades/admin/lang/application/insert/insert-langs.command';

@ApiTags('[admin] lang')
@Controller('admin/langs')
export class InsertLangsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert langs in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.', type: [LangDto] })
    @ApiBody({ type: [CreateLangDto] })
    async main(@Body() payload: CreateLangDto[])
    {
        await this.commandBus.dispatch(new InsertLangsCommand(payload));
    }
}