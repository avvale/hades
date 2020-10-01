import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';
import { CreateMessageDetailDto } from './../dto/create-message-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateMessagesDetailCommand } from '@hades/cci/message-detail/application/create/create-messages-detail.command';

@ApiTags('[cci] message-detail')
@Controller('cci/messages-detail')
export class CreateMessagesDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create messages-detail in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [MessageDetailDto] })
    @ApiBody({ type: [CreateMessageDetailDto] })
    async main(@Body() payload: CreateMessageDetailDto[])
    {
        await this.commandBus.dispatch(new CreateMessagesDetailCommand(payload));
    }
}