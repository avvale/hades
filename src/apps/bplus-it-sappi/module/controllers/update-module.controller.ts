import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateModuleDto } from './../dto/update-module.dto';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateModuleCommand } from '@hades/bplus-it-sappi/module/application/update/update-module.command';
import { FindModuleByIdQuery } from '@hades/bplus-it-sappi/module/application/find/find-module-by-id.query';

@ApiTags('[bplus-it-sappi] module')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: ModuleDto})
@Controller('bplus-it-sappi/module')
export class UpdateModuleController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update module' })
    async main(@Body() payload: UpdateModuleDto)
    {
        await this.commandBus.dispatch(new UpdateModuleCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.channelId,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.flowParty,
            payload.flowComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.parameterGroup,
            payload.name,
            payload.parameterName,
            payload.parameterValue,
            
        ));

        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id));
    }
}