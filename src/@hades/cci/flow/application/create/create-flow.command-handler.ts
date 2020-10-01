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
    FlowData
    
} from './../../domain/value-objects';

@CommandHandler(CreateFlowCommand)
export class CreateFlowCommandHandler implements ICommandHandler<CreateFlowCommand>
{
    constructor(
        private readonly createFlowService: CreateFlowService
    ) { }

    async execute(command: CreateFlowCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createFlowService.main(
            new FlowId(command.id),
            new FlowHash(command.hash),
            new FlowTenantId(command.tenantId),
            new FlowTenantCode(command.tenantCode),
            new FlowSystemId(command.systemId),
            new FlowSystemName(command.systemName),
            new FlowVersion(command.version),
            new FlowScenario(command.scenario),
            new FlowParty(command.party),
            new FlowReceiverParty(command.receiverParty),
            new FlowComponent(command.component),
            new FlowReceiverComponent(command.receiverComponent),
            new FlowInterfaceName(command.interfaceName),
            new FlowInterfaceNamespace(command.interfaceNamespace),
            new FlowIflowName(command.iflowName),
            new FlowResponsibleUserAccount(command.responsibleUserAccount),
            new FlowLastChangeUserAccount(command.lastChangeUserAccount),
            new FlowLastChangedAt(command.lastChangedAt),
            new FlowFolderPath(command.folderPath),
            new FlowDescription(command.description),
            new FlowApplication(command.application),
            new FlowIsCritical(command.isCritical),
            new FlowIsComplex(command.isComplex),
            new FlowFieldGroupId(command.fieldGroupId),
            new FlowData(command.data),
            
        );
    }
}