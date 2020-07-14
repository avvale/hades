import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SummaryDto } from './../dto/summary.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSummaryByIdQuery } from '@hades/nfc/summary/application/find/find-summary-by-id.query';
import { DeleteSummaryByIdCommand } from '@hades/nfc/summary/application/delete/delete-summary-by-id.command';

@ApiTags('[nfc] summary')
@Controller('nfc/summary')
export class DeleteSummaryByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete summary by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: SummaryDto })
    async main(@Param('id') id: string)
    {
        const summary = await this.queryBus.ask(new FindSummaryByIdQuery(id));

        await this.commandBus.dispatch(new DeleteSummaryByIdCommand(id));

        return summary;
    }
}