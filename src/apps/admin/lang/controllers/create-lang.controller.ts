import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateLangDto } from './../dto/create-lang.dto';
import { LangDto } from './../dto/lang.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';
import { CreateLangCommand } from '@hades/admin/lang/application/create/create-lang.command';

@ApiTags('[admin] lang')
@Controller('admin/lang')
export class CreateLangController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create lang' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: LangDto })
    async main(@Body() payload: CreateLangDto)
    {
        await this.commandBus.dispatch(new CreateLangCommand(
            payload.id,
            payload.name,
            payload.image,
            payload.iso6392,
            payload.iso6393,
            payload.ietf,
            payload.sort,
            payload.isActive,
            
        ));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id));
    }
}