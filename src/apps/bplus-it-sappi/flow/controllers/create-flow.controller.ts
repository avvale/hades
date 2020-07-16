import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateFlowDto } from './../dto/create-flow.dto';
import { FlowDto } from './../dto/flow.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindFlowByIdQuery } from '@hades/bplus-it-sappi/flow/application/find/find-flow-by-id.query';
import { CreateFlowCommand } from '@hades/bplus-it-sappi/flow/application/create/create-flow.command';

@ApiTags('[bplus-it-sappi] flow')
@Controller('bplus-it-sappi/flow')
export class CreateFlowController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create flow' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: FlowDto })
    async main(@Body() payload: CreateFlowDto)
    {
        await this.commandBus.dispatch(new CreateFlowCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
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