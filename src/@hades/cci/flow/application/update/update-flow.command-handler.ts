import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateFlowCommand } from './update-flow.command';
import { UpdateFlowService } from './update-flow.service';
import {
    FlowId,
    FlowHash,
    FlowTenantId,
    FlowTenantCode,
    FlowSystemId,
    FlowSystemName,
    FlowVersion,
    FlowScenario,
    FlowParty,
    FlowReceiverParty,
    FlowComponent,
    FlowReceiverComponent,
    FlowInterfaceName,
    FlowInterfaceNamespace,
    FlowIflowName,
    FlowResponsibleUserAccount,
    FlowLastChangeUserAccount,
    FlowLastChangedAt,
    FlowFolderPath,
    FlowDescription,
    FlowApplication,
    FlowIsCritical,
    FlowIsComplex,
    FlowFieldGroupId,
    FlowData,
    FlowCreatedAt,
    FlowUpdatedAt,
    FlowDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(UpdateFlowCommand)
export class UpdateFlowCommandHandler implements ICommandHandler<UpdateFlowCommand>
{
    constructor(
        private readonly updateFlowService: UpdateFlowService,
    ) {}

    async execute(command: UpdateFlowCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateFlowService.main(
            {
                id: new FlowId(command.payload.id),
                hash: new FlowHash(command.payload.hash, { undefinable: true }),
                tenantId: new FlowTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new FlowTenantCode(command.payload.tenantCode, { undefinable: true }),
                systemId: new FlowSystemId(command.payload.systemId, { undefinable: true }),
                systemName: new FlowSystemName(command.payload.systemName, { undefinable: true }),
                version: new FlowVersion(command.payload.version, { undefinable: true }),
                scenario: new FlowScenario(command.payload.scenario),
                party: new FlowParty(command.payload.party),
                receiverParty: new FlowReceiverParty(command.payload.receiverParty),
                component: new FlowComponent(command.payload.component, { undefinable: true }),
                receiverComponent: new FlowReceiverComponent(command.payload.receiverComponent),
                interfaceName: new FlowInterfaceName(command.payload.interfaceName, { undefinable: true }),
                interfaceNamespace: new FlowInterfaceNamespace(command.payload.interfaceNamespace, { undefinable: true }),
                iflowName: new FlowIflowName(command.payload.iflowName),
                responsibleUserAccount: new FlowResponsibleUserAccount(command.payload.responsibleUserAccount),
                lastChangeUserAccount: new FlowLastChangeUserAccount(command.payload.lastChangeUserAccount),
                lastChangedAt: new FlowLastChangedAt(command.payload.lastChangedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                folderPath: new FlowFolderPath(command.payload.folderPath),
                description: new FlowDescription(command.payload.description),
                application: new FlowApplication(command.payload.application),
                isCritical: new FlowIsCritical(command.payload.isCritical),
                isComplex: new FlowIsComplex(command.payload.isComplex),
                fieldGroupId: new FlowFieldGroupId(command.payload.fieldGroupId),
                data: new FlowData(command.payload.data),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}