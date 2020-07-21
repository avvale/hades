import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { SummaryDto } from './../dto/summary.dto';
import { CreateSummaryDto } from './../dto/create-summary.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateSummariesCommand } from '@hades/nfc/summary/application/create/create-summaries.command';

@ApiTags('[nfc] summary')
@Controller('nfc/summaries')
export class CreateSummariesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create summaries in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [SummaryDto] })
    @ApiBody({ type: [CreateSummaryDto] })
    async main(@Body() payload: CreateSummaryDto[])
    {
        await this.commandBus.dispatch(new CreateSummariesCommand(payload));
    }
}