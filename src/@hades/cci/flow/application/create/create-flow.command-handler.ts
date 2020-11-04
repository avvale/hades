import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFlowCommand } from './create-flow.command';
import { CreateFlowService } from './create-flow.service';
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

@CommandHandler(CreateFlowCommand)
export class CreateFlowCommandHandler implements ICommandHandler<CreateFlowCommand>
{
    constructor(
        private readonly createFlowService: CreateFlowService,
    ) {}

    async execute(command: CreateFlowCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createFlowService.main(
            {
                id: new FlowId(command.payload.id),
                hash: new FlowHash(command.payload.hash),
                tenantId: new FlowTenantId(command.payload.tenantId),
                tenantCode: new FlowTenantCode(command.payload.tenantCode),
                systemId: new FlowSystemId(command.payload.systemId),
                systemName: new FlowSystemName(command.payload.systemName),
                version: new FlowVersion(command.payload.version),
                scenario: new FlowScenario(command.payload.scenario),
                party: new FlowParty(command.payload.party),
                receiverParty: new FlowReceiverParty(command.payload.receiverParty),
                component: new FlowComponent(command.payload.component),
                receiverComponent: new FlowReceiverComponent(command.payload.receiverComponent),
                interfaceName: new FlowInterfaceName(command.payload.interfaceName),
                interfaceNamespace: new FlowInterfaceNamespace(command.payload.interfaceNamespace),
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
            }
        );
    }
}