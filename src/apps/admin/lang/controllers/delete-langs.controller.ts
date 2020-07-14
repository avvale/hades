import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { LangDto } from './../dto/lang.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { DeleteLangsCommand } from '@hades/admin/lang/application/delete/delete-langs.command';

@ApiTags('[admin] lang')
@Controller('admin/langs')
export class DeleteLangsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete lang in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [LangDto] })
    @ApiBody({type: [QueryStatementInput]})
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const langs = await this.queryBus.ask(new GetLangsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteLangsCommand(queryStatements));

        return langs;
    }
}