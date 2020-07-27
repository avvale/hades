import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateModuleCommand } from './update-module.command';
import { UpdateModuleService } from './update-module.service';
import { 
    ModuleId, 
    ModuleTenantId, 
    ModuleTenantCode, 
    ModuleSystemId, 
    ModuleSystemName, 
    ModuleChannelId, 
    ModuleChannelParty, 
    ModuleChannelComponent, 
    ModuleChannelName, 
    ModuleFlowId, 
    ModuleFlowParty, 
    ModuleFlowComponent, 
    ModuleFlowInterfaceName, 
    ModuleFlowInterfaceNamespace, 
    ModuleVersion, 
    ModuleParameterGroup, 
    ModuleName, 
    ModuleParameterName, 
    ModuleParameterValue
    
} from './../../domain/value-objects';

@CommandHandler(UpdateModuleCommand)
export class UpdateModuleCommandHandler implements ICommandHandler<UpdateModuleCommand>
{
    constructor(
        private readonly updateModuleService: UpdateModuleService
    ) { }

    async execute(command: UpdateModuleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateModuleService.main(
            new ModuleId(command.id),
            new ModuleTenantId(command.tenantId, { undefinable: true }),
            new ModuleTenantCode(command.tenantCode, { undefinable: true }),
            new ModuleSystemId(command.systemId, { undefinable: true }),
            new ModuleSystemName(command.systemName, { undefinable: true }),
            new ModuleChannelId(command.channelId, { undefinable: true }),
            new ModuleChannelParty(command.channelParty),
            new ModuleChannelComponent(command.channelComponent, { undefinable: true }),
            new ModuleChannelName(command.channelName, { undefinable: true }),
            new ModuleFlowId(command.flowId),
            new ModuleFlowParty(command.flowParty),
            new ModuleFlowComponent(command.flowComponent, { undefinable: true }),
            new ModuleFlowInterfaceName(command.flowInterfaceName, { undefinable: true }),
            new ModuleFlowInterfaceNamespace(command.flowInterfaceNamespace, { undefinable: true }),
            new ModuleVersion(command.version, { undefinable: true }),
            new ModuleParameterGroup(command.parameterGroup),
            new ModuleName(command.name),
            new ModuleParameterName(command.parameterName),
            new ModuleParameterValue(command.parameterValue),
            
        )
    }
}