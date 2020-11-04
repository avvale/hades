import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateModulesCommand } from './create-modules.command';
import { CreateModulesService } from './create-modules.service';
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
    ModuleParameterValue,
    ModuleCreatedAt,
    ModuleUpdatedAt,
    ModuleDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateModulesCommand)
export class CreateModulesCommandHandler implements ICommandHandler<CreateModulesCommand>
{
    constructor(
        private readonly createModulesService: CreateModulesService,
    ) {}

    async execute(command: CreateModulesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createModulesService.main(
            command.payload
                .map(module => {
                    return {
                        id: new ModuleId(module.id),
                        tenantId: new ModuleTenantId(module.tenantId),
                        tenantCode: new ModuleTenantCode(module.tenantCode),
                        systemId: new ModuleSystemId(module.systemId),
                        systemName: new ModuleSystemName(module.systemName),
                        channelHash: new ModuleChannelHash(module.channelHash),
                        channelParty: new ModuleChannelParty(module.channelParty),
                        channelComponent: new ModuleChannelComponent(module.channelComponent),
                        channelName: new ModuleChannelName(module.channelName),
                        flowHash: new ModuleFlowHash(module.flowHash),
                        flowParty: new ModuleFlowParty(module.flowParty),
                        flowReceiverParty: new ModuleFlowReceiverParty(module.flowReceiverParty),
                        flowComponent: new ModuleFlowComponent(module.flowComponent),
                        flowReceiverComponent: new ModuleFlowReceiverComponent(module.flowReceiverComponent),
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