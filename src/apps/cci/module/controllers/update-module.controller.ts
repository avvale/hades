import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateModuleDto } from './../dto/update-module.dto';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateModuleCommand } from '@hades/cci/module/application/update/update-module.command';
import { FindModuleByIdQuery } from '@hades/cci/module/application/find/find-module-by-id.query';

@ApiTags('[cci] module')
@Controller('cci/module')
export class UpdateModuleController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update module' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ModuleDto})
    async main(@Body() payload: UpdateModuleDto)
    {
        await this.commandBus.dispatch(new UpdateModuleCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.channelHash,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.flowHash,
            payload.flowParty,
            payload.flowReceiverParty,
            payload.flowComponent,
            payload.flowReceiverComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.version,
            payload.parameterGroup,
            payload.name,
            payload.parameterName,
            payload.parameterValue,
            
        ));

        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id));
    }
}