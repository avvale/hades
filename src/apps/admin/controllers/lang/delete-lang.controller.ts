import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LangDto } from './../../dto/lang.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { DeleteLangCommand } from '@hades/admin/lang/application/delete/delete-lang.command';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';

@ApiTags('lang')
@ApiOkResponse({ description: 'The record has been successfully deleted.', type: LangDto})
@Controller('admin/lang')
export class DeleteLangController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    async main(@Param('id') id: string)
    {
        const lang = await this.queryBus.ask(new FindLangByIdQuery(id));

        await this.commandBus.dispatch(new DeleteLangCommand(id));

        return lang;
    }
}