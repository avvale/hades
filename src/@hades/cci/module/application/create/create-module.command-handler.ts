import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateModuleCommand } from './create-module.command';
import { CreateModuleService } from './create-module.service';
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

@CommandHandler(CreateModuleCommand)
export class CreateModuleCommandHandler implements ICommandHandler<CreateModuleCommand>
{
    constructor(
        private readonly createModuleService: CreateModuleService,
    ) {}

    async execute(command: CreateModuleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createModuleService.main(
            {
                id: new ModuleId(command.payload.id),
                tenantId: new ModuleTenantId(command.payload.tenantId),
                tenantCode: new ModuleTenantCode(command.payload.tenantCode),
                systemId: new ModuleSystemId(command.payload.systemId),
                systemName: new ModuleSystemName(command.payload.systemName),
                channelHash: new ModuleChannelHash(command.payload.channelHash),
                channelParty: new ModuleChannelParty(command.payload.channelParty),
                channelComponent: new ModuleChannelComponent(command.payload.channelComponent),
                channelName: new ModuleChannelName(command.payload.channelName),
                flowHash: new ModuleFlowHash(command.payload.flowHash),
                flowParty: new ModuleFlowParty(command.payload.flowParty),
                flowReceiverParty: new ModuleFlowReceiverParty(command.payload.flowReceiverParty),
                flowComponent: new ModuleFlowComponent(command.payload.flowComponent),
                flowReceiverComponent: new ModuleFlowReceiverComponent(command.payload.flowReceiverComponent),
                flowInterfaceName: new ModuleFlowInterfaceName(command.payload.flowInterfaceName),
                flowInterfaceNamespace: new ModuleFlowInterfaceNamespace(command.payload.flowInterfaceNamespace),
                version: new ModuleVersion(command.payload.version),
                parameterGroup: new ModuleParameterGroup(command.payload.parameterGroup),
                name: new ModuleName(command.payload.name),
                parameterName: new ModuleParameterName(command.payload.parameterName),
                parameterValue: new ModuleParameterValue(command.payload.parameterValue),
            }
        );
    }
}