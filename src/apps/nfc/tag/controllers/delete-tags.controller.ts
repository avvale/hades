import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { TagDto } from './../dto/tag.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetTagsQuery } from '@hades/nfc/tag/application/get/get-tags.query';
import { DeleteTagsCommand } from '@hades/nfc/tag/application/delete/delete-tags.command';

@ApiTags('[nfc] tag')
@Controller('nfc/tags')
export class DeleteTagsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete tags in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [TagDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const tags = await this.queryBus.ask(new GetTagsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteTagsCommand(queryStatements));

        return tags;
    }
}