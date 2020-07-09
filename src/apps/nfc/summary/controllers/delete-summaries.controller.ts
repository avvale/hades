import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SummaryDto } from './../dto/summary.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSummariesQuery } from '@hades/nfc/summary/application/get/get-summaries.query';
import { DeleteSummariesCommand } from '@hades/nfc/summary/application/delete/delete-summaries.command';

@ApiTags('[nfc] summary')
@Controller('nfc/summaries')
export class DeleteSummariesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete summaries in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [SummaryDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const summaries = await this.queryBus.ask(new GetSummariesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteSummariesCommand(queryStatements));

        return summaries;
    }
}