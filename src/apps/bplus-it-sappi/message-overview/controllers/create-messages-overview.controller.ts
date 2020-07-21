import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';
import { CreateMessageOverviewDto } from './../dto/create-message-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateMessagesOverviewCommand } from '@hades/bplus-it-sappi/message-overview/application/create/create-messages-overview.command';

@ApiTags('[bplus-it-sappi] message-overview')
@Controller('bplus-it-sappi/messages-overview')
export class CreateMessagesOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create messages-overview in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [MessageOverviewDto] })
    @ApiBody({ type: [CreateMessageOverviewDto] })
    async main(@Body() payload: CreateMessageOverviewDto[])
    {
        await this.commandBus.dispatch(new CreateMessagesOverviewCommand(payload));
    }
}