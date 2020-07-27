import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateModuleDto } from './../dto/create-module.dto';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindModuleByIdQuery } from '@hades/bplus-it-sappi/module/application/find/find-module-by-id.query';
import { CreateModuleCommand } from '@hades/bplus-it-sappi/module/application/create/create-module.command';

@ApiTags('[bplus-it-sappi] module')
@Controller('bplus-it-sappi/module')
export class CreateModuleController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create module' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ModuleDto })
    async main(@Body() payload: CreateModuleDto)
    {
        await this.commandBus.dispatch(new CreateModuleCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.channelId,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.flowId,
            payload.flowParty,
            payload.flowComponent,
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