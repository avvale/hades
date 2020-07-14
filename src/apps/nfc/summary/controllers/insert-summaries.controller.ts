import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { SummaryDto } from './../dto/summary.dto';
import { CreateSummaryDto } from './../dto/create-summary.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertSummariesCommand } from '@hades/nfc/summary/application/insert/insert-summaries.command';

@ApiTags('[nfc] summary')
@Controller('nfc/summaries')
export class InsertSummariesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert summaries in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [SummaryDto] })
    @ApiBody({ type: [CreateSummaryDto] })
    async main(@Body() payload: CreateSummaryDto[])
    {
        await this.commandBus.dispatch(new InsertSummariesCommand(payload));
    }
}