import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateMessageOverviewDto } from './../dto/create-message-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertMessagesOverviewCommand } from '@hades/bplus-it-sappi/message-overview/application/insert/insert-messages-overview.command';

@ApiTags('[bplus-it-sappi] message-overview')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('bplus-it-sappi/messages-overview')
export class InsertMessagesOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert messages-overview in batch' })
    @ApiBody({ 
        type: [CreateMessageOverviewDto]
    })
    async main(@Body() payload: CreateMessageOverviewDto[])
    {
        await this.commandBus.dispatch(new InsertMessagesOverviewCommand(payload));
    }
}