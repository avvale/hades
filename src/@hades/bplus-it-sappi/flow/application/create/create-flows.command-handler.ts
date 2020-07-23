import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFlowsCommand } from './create-flows.command';
import { CreateFlowsService } from './create-flows.service';
import { 
    FlowId, 
    FlowTenantId, 
    FlowTenantCode, 
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

@CommandHandler(CreateFlowsCommand)
export class CreateFlowsCommandHandler implements ICommandHandler<CreateFlowsCommand>
{
    constructor(
        private readonly createFlowsService: CreateFlowsService
    ) { }

    async execute(command: CreateFlowsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createFlowsService.main(
            command.flows
                .map(flow => { 
                    return {
                        id: new FlowId(flow.id),
                        tenantId: new FlowTenantId(flow.tenantId),
                        tenantCode: new FlowTenantCode(flow.tenantCode),
                        systemId: new FlowSystemId(flow.systemId),
                        systemName: new FlowSystemName(flow.systemName),
                        scenario: new FlowScenario(flow.scenario),
                        party: new FlowParty(flow.party),
                        component: new FlowComponent(flow.component),
                        interfaceName: new FlowInterfaceName(flow.interfaceName),
                        interfaceNamespace: new FlowInterfaceNamespace(flow.interfaceNamespace),
                        iflowName: new FlowIflowName(flow.iflowName),
                        responsibleUserAccount: new FlowResponsibleUserAccount(flow.responsibleUserAccount),
                        lastChangeUserAccount: new FlowLastChangeUserAccount(flow.lastChangeUserAccount),
                        lastChangedAt: new FlowLastChangedAt(flow.lastChangedAt),
                        folderPath: new FlowFolderPath(flow.folderPath),
                        description: new FlowDescription(flow.description),
                        application: new FlowApplication(flow.application),
                        isCritical: new FlowIsCritical(flow.isCritical),
                        isComplex: new FlowIsComplex(flow.isComplex),
                        fieldGroupId: new FlowFieldGroupId(flow.fieldGroupId),
                        data: new FlowData(flow.data),
                        
                    }
                })
        );
    }
}