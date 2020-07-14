import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ActionDto } from './../dto/action.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindActionByIdQuery } from '@hades/nfc/action/application/find/find-action-by-id.query';
import { DeleteActionByIdCommand } from '@hades/nfc/action/application/delete/delete-action-by-id.command';

@ApiTags('[nfc] action')
@Controller('nfc/action')
export class DeleteActionByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete action by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ActionDto })
    async main(@Param('id') id: string)
    {
        const action = await this.queryBus.ask(new FindActionByIdQuery(id));

        await this.commandBus.dispatch(new DeleteActionByIdCommand(id));

        return action;
    }
}