import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateSummaryDto } from './../dto/update-summary.dto';
import { SummaryDto } from './../dto/summary.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateSummaryCommand } from '@hades/nfc/summary/application/update/update-summary.command';
import { FindSummaryByIdQuery } from '@hades/nfc/summary/application/find/find-summary-by-id.query';

@ApiTags('[nfc] summary')
@Controller('nfc/summary')
export class UpdateSummaryController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update summary' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: SummaryDto})
    async main(@Body() payload: UpdateSummaryDto)
    {
        await this.commandBus.dispatch(new UpdateSummaryCommand(
            payload.id,
            payload.tagId,
            payload.tenantId,
            payload.accessAt,
            payload.counter,
            
        ));

        return await this.queryBus.ask(new FindSummaryByIdQuery(payload.id));
    }
}