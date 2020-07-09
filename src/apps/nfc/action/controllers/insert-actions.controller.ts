import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ActionDto } from './../dto/action.dto';
import { CreateActionDto } from './../dto/create-action.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertActionsCommand } from '@hades/nfc/action/application/insert/insert-actions.command';

@ApiTags('[nfc] action')
@Controller('nfc/actions')
export class InsertActionsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert actions in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ActionDto] })
    @ApiBody({ type: [CreateActionDto] })
    async main(@Body() payload: CreateActionDto[])
    {
        await this.commandBus.dispatch(new InsertActionsCommand(payload));
    }
}