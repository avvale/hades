import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';
import { CreateMessageDetailDto } from './../dto/create-message-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertMessagesDetailCommand } from '@hades/bplus-it-sappi/message-detail/application/insert/insert-messages-detail.command';

@ApiTags('[bplus-it-sappi] message-detail')
@Controller('bplus-it-sappi/messages-detail')
export class InsertMessagesDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert messages-detail in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [MessageDetailDto] })
    @ApiBody({ type: [CreateMessageDetailDto] })
    async main(@Body() payload: CreateMessageDetailDto[])
    {
        await this.commandBus.dispatch(new InsertMessagesDetailCommand(payload));
    }
}