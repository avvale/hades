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
    ModuleParameterValue,
    ModuleCreatedAt,
    ModuleUpdatedAt,
    ModuleDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(UpdateModuleCommand)
export class UpdateModuleCommandHandler implements ICommandHandler<UpdateModuleCommand>
{
    constructor(
        private readonly updateModuleService: UpdateModuleService,
    ) {}

    async execute(command: UpdateModuleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateModuleService.main(
            {
                id: new ModuleId(command.payload.id),
                tenantId: new ModuleTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new ModuleTenantCode(command.payload.tenantCode, { undefinable: true }),
                systemId: new ModuleSystemId(command.payload.systemId, { undefinable: true }),
                systemName: new ModuleSystemName(command.payload.systemName, { undefinable: true }),
                channelHash: new ModuleChannelHash(command.payload.channelHash, { undefinable: true }),
                channelParty: new ModuleChannelParty(command.payload.channelParty),
                channelComponent: new ModuleChannelComponent(command.payload.channelComponent, { undefinable: true }),
                channelName: new ModuleChannelName(command.payload.channelName, { undefinable: true }),
                flowHash: new ModuleFlowHash(command.payload.flowHash),
                flowParty: new ModuleFlowParty(command.payload.flowParty),
                flowReceiverParty: new ModuleFlowReceiverParty(command.payload.flowReceiverParty),
                flowComponent: new ModuleFlowComponent(command.payload.flowComponent),
                flowReceiverComponent: new ModuleFlowReceiverComponent(command.payload.flowReceiverComponent),
                flowInterfaceName: new ModuleFlowInterfaceName(command.payload.flowInterfaceName),
                flowInterfaceNamespace: new ModuleFlowInterfaceNamespace(command.payload.flowInterfaceNamespace),
                version: new ModuleVersion(command.payload.version, { undefinable: true }),
                parameterGroup: new ModuleParameterGroup(command.payload.parameterGroup),
                name: new ModuleName(command.payload.name),
                parameterName: new ModuleParameterName(command.payload.parameterName),
                parameterValue: new ModuleParameterValue(command.payload.parameterValue),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}