import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateModulesCommand } from './create-modules.command';
import { CreateModulesService } from './create-modules.service';
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

@CommandHandler(CreateModulesCommand)
export class CreateModulesCommandHandler implements ICommandHandler<CreateModulesCommand>
{
    constructor(
        private readonly createModulesService: CreateModulesService
    ) { }

    async execute(command: CreateModulesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createModulesService.main(
            command.modules
                .map(module => { 
                    return {
                        id: new ModuleId(module.id),
                        tenantId: new ModuleTenantId(module.tenantId),
                        tenantCode: new ModuleTenantCode(module.tenantCode),
                        systemId: new ModuleSystemId(module.systemId),
                        systemName: new ModuleSystemName(module.systemName),
                        channelId: new ModuleChannelId(module.channelId),
                        channelParty: new ModuleChannelParty(module.channelParty),
                        channelComponent: new ModuleChannelComponent(module.channelComponent),
                        channelName: new ModuleChannelName(module.channelName),
                        flowId: new ModuleFlowId(module.flowId),
                        flowParty: new ModuleFlowParty(module.flowParty),
                        flowComponent: new ModuleFlowComponent(module.flowComponent),
                        flowInterfaceName: new ModuleFlowInterfaceName(module.flowInterfaceName),
                        flowInterfaceNamespace: new ModuleFlowInterfaceNamespace(module.flowInterfaceNamespace),
                        version: new ModuleVersion(module.version),
                        parameterGroup: new ModuleParameterGroup(module.parameterGroup),
                        name: new ModuleName(module.name),
                        parameterName: new ModuleParameterName(module.parameterName),
                        parameterValue: new ModuleParameterValue(module.parameterValue),
                        
                    }
                })
        );
    }
}