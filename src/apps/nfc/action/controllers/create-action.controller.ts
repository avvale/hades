import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateActionDto } from './../dto/create-action.dto';
import { ActionDto } from './../dto/action.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindActionByIdQuery } from '@hades/nfc/action/application/find/find-action-by-id.query';
import { CreateActionCommand } from '@hades/nfc/action/application/create/create-action.command';

@ApiTags('[nfc] action')
@Controller('nfc/action')
export class CreateActionController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create action' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ActionDto })
    async main(@Body() payload: CreateActionDto)
    {
        await this.commandBus.dispatch(new CreateActionCommand(
            payload.id,
            payload.tagId,
            payload.type,
            payload.sectionId,
            payload.data,
            
        ));

        return await this.queryBus.ask(new FindActionByIdQuery(payload.id));
    }
}