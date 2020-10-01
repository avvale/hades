import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFlowsCommand } from './create-flows.command';
import { CreateFlowsService } from './create-flows.service';
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
                        hash: new FlowHash(flow.hash),
                        tenantId: new FlowTenantId(flow.tenantId),
                        tenantCode: new FlowTenantCode(flow.tenantCode),
                        systemId: new FlowSystemId(flow.systemId),
                        systemName: new FlowSystemName(flow.systemName),
                        version: new FlowVersion(flow.version),
                        scenario: new FlowScenario(flow.scenario),
                        party: new FlowParty(flow.party),
                        receiverParty: new FlowReceiverParty(flow.receiverParty),
                        component: new FlowComponent(flow.component),
                        receiverComponent: new FlowReceiverComponent(flow.receiverComponent),
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