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
    FlowComponent, 
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

@CommandHandler(UpdateFlowCommand)
export class UpdateFlowCommandHandler implements ICommandHandler<UpdateFlowCommand>
{
    constructor(
        private readonly updateFlowService: UpdateFlowService
    ) { }

    async execute(command: UpdateFlowCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateFlowService.main(
            new FlowId(command.id),
            new FlowHash(command.hash, { undefinable: true }),
            new FlowTenantId(command.tenantId, { undefinable: true }),
            new FlowTenantCode(command.tenantCode, { undefinable: true }),
            new FlowSystemId(command.systemId, { undefinable: true }),
            new FlowSystemName(command.systemName, { undefinable: true }),
            new FlowVersion(command.version, { undefinable: true }),
            new FlowScenario(command.scenario, { undefinable: true }),
            new FlowParty(command.party),
            new FlowComponent(command.component, { undefinable: true }),
            new FlowInterfaceName(command.interfaceName, { undefinable: true }),
            new FlowInterfaceNamespace(command.interfaceNamespace, { undefinable: true }),
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
            
        )
    }
}