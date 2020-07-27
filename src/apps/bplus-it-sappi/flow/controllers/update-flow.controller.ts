import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateFlowDto } from './../dto/update-flow.dto';
import { FlowDto } from './../dto/flow.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateFlowCommand } from '@hades/bplus-it-sappi/flow/application/update/update-flow.command';
import { FindFlowByIdQuery } from '@hades/bplus-it-sappi/flow/application/find/find-flow-by-id.query';

@ApiTags('[bplus-it-sappi] flow')
@Controller('bplus-it-sappi/flow')
export class UpdateFlowController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update flow' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: FlowDto})
    async main(@Body() payload: UpdateFlowDto)
    {
        await this.commandBus.dispatch(new UpdateFlowCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.version,
            payload.scenario,
            payload.party,
            payload.component,
            payload.interfaceName,
            payload.interfaceNamespace,
            payload.iflowName,
            payload.responsibleUserAccount,
            payload.lastChangeUserAccount,
            payload.lastChangedAt,
            payload.folderPath,
            payload.description,
            payload.application,
            payload.isCritical,
            payload.isComplex,
            payload.fieldGroupId,
            payload.data,
            
        ));

        return await this.queryBus.ask(new FindFlowByIdQuery(payload.id));
    }
}