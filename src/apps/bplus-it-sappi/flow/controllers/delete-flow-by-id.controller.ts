import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindFlowByIdQuery } from '@hades/bplus-it-sappi/flow/application/find/find-flow-by-id.query';
import { DeleteFlowByIdCommand } from '@hades/bplus-it-sappi/flow/application/delete/delete-flow-by-id.command';

@ApiTags('[bplus-it-sappi] flow')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: FlowDto})
@Controller('bplus-it-sappi/flow')
export class DeleteFlowByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete flow by id' })
    async main(@Param('id') id: string)
    {
        const flow = await this.queryBus.ask(new FindFlowByIdQuery(id));

        await this.commandBus.dispatch(new DeleteFlowByIdCommand(id));

        return flow;
    }
}