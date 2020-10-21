import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateModuleCommand } from './update-module.command';
import { UpdateModuleService } from './update-module.service';
import { 
    ModuleId,
    ModuleTenantId,
    ModuleTenantCode,
    ModuleSystemId,
    ModuleSystemName,
    ModuleChannelHash,
    ModuleChannelParty,
    ModuleChannelComponent,
    ModuleChannelName,
    ModuleFlowHash,
    ModuleFlowParty,
    ModuleFlowReceiverParty,
    ModuleFlowComponent,
    ModuleFlowReceiverComponent,
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
            new ModuleChannelHash(command.channelHash, { undefinable: true }),
            new ModuleChannelParty(command.channelParty),
            new ModuleChannelComponent(command.channelComponent, { undefinable: true }),
            new ModuleChannelName(command.channelName, { undefinable: true }),
            new ModuleFlowHash(command.flowHash),
            new ModuleFlowParty(command.flowParty),
            new ModuleFlowReceiverParty(command.flowReceiverParty),
            new ModuleFlowComponent(command.flowComponent),
            new ModuleFlowReceiverComponent(command.flowReceiverComponent),
            new ModuleFlowInterfaceName(command.flowInterfaceName),
            new ModuleFlowInterfaceNamespace(command.flowInterfaceNamespace),
            new ModuleVersion(command.version, { undefinable: true }),
            new ModuleParameterGroup(command.parameterGroup),
            new ModuleName(command.name),
            new ModuleParameterName(command.parameterName),
            new ModuleParameterValue(command.parameterValue),
            
        )
    }
}