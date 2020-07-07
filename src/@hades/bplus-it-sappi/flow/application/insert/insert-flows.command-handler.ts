import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertFlowsCommand } from './insert-flows.command';
import { InsertFlowsService } from './insert-flows.service';
import { 
    FlowId, 
    FlowTenantId, 
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

@CommandHandler(InsertFlowsCommand)
export class InsertFlowsCommandHandler implements ICommandHandler<InsertFlowsCommand>
{
    constructor(
        private readonly insertFlowsService: InsertFlowsService
    ) { }

    async execute(command: InsertFlowsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertFlowsService.main(
            command.flows
                .map(flow => { 
                    return {
                        id: new FlowId(flow.id),
                        tenantId: new FlowTenantId(flow.tenantId),
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