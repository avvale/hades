import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateActionDto } from './../dto/update-action.dto';
import { ActionDto } from './../dto/action.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateActionCommand } from '@hades/nfc/action/application/update/update-action.command';
import { FindActionByIdQuery } from '@hades/nfc/action/application/find/find-action-by-id.query';

@ApiTags('[nfc] action')
@Controller('nfc/action')
export class UpdateActionController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update action' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ActionDto})
    async main(@Body() payload: UpdateActionDto)
    {
        await this.commandBus.dispatch(new UpdateActionCommand(
            payload.id,
            payload.tagId,
            payload.type,
            payload.sectionId,
            payload.data,
            
        ));

        return await this.queryBus.ask(new FindActionByIdQuery(payload.id));
    }
}