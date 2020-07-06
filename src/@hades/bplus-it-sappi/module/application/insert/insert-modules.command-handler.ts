import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertModulesCommand } from './insert-modules.command';
import { InsertModulesService } from './insert-modules.service';
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

@CommandHandler(InsertModulesCommand)
export class InsertModulesCommandHandler implements ICommandHandler<InsertModulesCommand>
{
    constructor(
        private readonly insertModulesService: InsertModulesService
    ) { }

    async execute(command: InsertModulesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertModulesService.main(
            command.modules
                .map(module => { 
                    return {
                        id: new ModuleId(module.id),
                        tenantId: new ModuleTenantId(module.tenantId),
                        systemId: new ModuleSystemId(module.systemId),
                        systemName: new ModuleSystemName(module.systemName),
                        channelId: new ModuleChannelId(module.channelId),
                        channelParty: new ModuleChannelParty(module.channelParty),
                        channelComponent: new ModuleChannelComponent(module.channelComponent),
                        channelName: new ModuleChannelName(module.channelName),
                        flowParty: new ModuleFlowParty(module.flowParty),
                        flowComponent: new ModuleFlowComponent(module.flowComponent),
                        flowInterfaceName: new ModuleFlowInterfaceName(module.flowInterfaceName),
                        flowInterfaceNamespace: new ModuleFlowInterfaceNamespace(module.flowInterfaceNamespace),
                        parameterGroup: new ModuleParameterGroup(module.parameterGroup),
                        name: new ModuleName(module.name),
                        parameterName: new ModuleParameterName(module.parameterName),
                        parameterValue: new ModuleParameterValue(module.parameterValue),
                        
                    }
                })
        );
    }
}