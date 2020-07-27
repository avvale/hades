import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFlowCommand } from './create-flow.command';
import { CreateFlowService } from './create-flow.service';
import { 
    FlowId, 
    FlowTenantId, 
    FlowTenantCode, 
    FlowVersion, 
    FlowSystemId, 
    FlowSystemName, 
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
            new FlowTenantId(command.tenantId),
            new FlowTenantCode(command.tenantCode),
            new FlowVersion(command.version),
            new FlowSystemId(command.systemId),
            new FlowSystemName(command.systemName),
            new FlowScenario(command.scenario),
            new FlowParty(command.party),
            new FlowComponent(command.component),
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