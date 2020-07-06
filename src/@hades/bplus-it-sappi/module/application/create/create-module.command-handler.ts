import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateModuleCommand } from './create-module.command';
import { CreateModuleService } from './create-module.service';
import { 
    ModuleId, 
    ModuleTenantId, 
    ModuleSystemId, 
    ModuleSystemName, 
    ModuleChannelId, 
    ModuleChannelParty, 
    ModuleChannelComponent, 
    ModuleChannelName, 
    ModuleFlowParty, 
    ModuleFlowComponent, 
    ModuleFlowInterfaceName, 
    ModuleFlowInterfaceNamespace, 
    ModuleParameterGroup, 
    ModuleName, 
    ModuleParameterName, 
    ModuleParameterValue
    
} from './../../domain/value-objects';

@CommandHandler(CreateModuleCommand)
export class CreateModuleCommandHandler implements ICommandHandler<CreateModuleCommand>
{
    constructor(
        private readonly createModuleService: CreateModuleService
    ) { }

    async execute(command: CreateModuleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createModuleService.main(
            new ModuleId(command.id),
            new ModuleTenantId(command.tenantId),
            new ModuleSystemId(command.systemId),
            new ModuleSystemName(command.systemName),
            new ModuleChannelId(command.channelId),
            new ModuleChannelParty(command.channelParty),
            new ModuleChannelComponent(command.channelComponent),
            new ModuleChannelName(command.channelName),
            new ModuleFlowParty(command.flowParty),
            new ModuleFlowComponent(command.flowComponent),
            new ModuleFlowInterfaceName(command.flowInterfaceName),
            new ModuleFlowInterfaceNamespace(command.flowInterfaceNamespace),
            new ModuleParameterGroup(command.parameterGroup),
            new ModuleName(command.name),
            new ModuleParameterName(command.parameterName),
            new ModuleParameterValue(command.parameterValue),
            
        );
    }
}