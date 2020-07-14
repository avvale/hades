import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateSummaryDto } from './../dto/create-summary.dto';
import { SummaryDto } from './../dto/summary.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSummaryByIdQuery } from '@hades/nfc/summary/application/find/find-summary-by-id.query';
import { CreateSummaryCommand } from '@hades/nfc/summary/application/create/create-summary.command';

@ApiTags('[nfc] summary')
@Controller('nfc/summary')
export class CreateSummaryController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create summary' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: SummaryDto })
    async main(@Body() payload: CreateSummaryDto)
    {
        await this.commandBus.dispatch(new CreateSummaryCommand(
            payload.id,
            payload.tagId,
            payload.tenantId,
            payload.accessAt,
            payload.counter,
            
        ));

        return await this.queryBus.ask(new FindSummaryByIdQuery(payload.id));
    }
}