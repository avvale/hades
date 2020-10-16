import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LangDto } from './../dto/lang.dto';
import { CreateLangDto } from './../dto/create-lang.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateLangsCommand } from '@hades/admin/lang/application/create/create-langs.command';

@ApiTags('[admin] lang')
@Controller('admin/langs')
@UseGuards(AuthGuard('jwt'))
export class CreateLangsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create langs in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [LangDto] })
    @ApiBody({ type: [CreateLangDto] })
    async main(@Body() payload: CreateLangDto[])
    {
        await this.commandBus.dispatch(new CreateLangsCommand(payload));
    }
}