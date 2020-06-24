import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LangDto } from './../dto/lang.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { DeleteLangsCommand } from '@hades/admin/lang/application/delete/delete-langs.command';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('lang')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: LangDto})
@Controller('admin/langs')
export class DeleteLangsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const langs = await this.queryBus.ask(new GetLangsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteLangsCommand(queryStatements));

        return langs;
    }
}