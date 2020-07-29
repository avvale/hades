import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    FlowData, 
    FlowCreatedAt, 
    FlowUpdatedAt, 
    FlowDeletedAt
    
} from './../../domain/value-objects';
import { IFlowRepository } from './../../domain/flow.repository';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';

@Injectable()
export class UpdateFlowService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository
    ) {}

    public async main(
        id: FlowId,
        hash?: FlowHash,
        tenantId?: FlowTenantId,
        tenantCode?: FlowTenantCode,
        systemId?: FlowSystemId,
        systemName?: FlowSystemName,
        version?: FlowVersion,
        scenario?: FlowScenario,
        party?: FlowParty,
        component?: FlowComponent,
        interfaceName?: FlowInterfaceName,
        interfaceNamespace?: FlowInterfaceNamespace,
        iflowName?: FlowIflowName,
        responsibleUserAccount?: FlowResponsibleUserAccount,
        lastChangeUserAccount?: FlowLastChangeUserAccount,
        lastChangedAt?: FlowLastChangedAt,
        folderPath?: FlowFolderPath,
        description?: FlowDescription,
        application?: FlowApplication,
        isCritical?: FlowIsCritical,
        isComplex?: FlowIsComplex,
        fieldGroupId?: FlowFieldGroupId,
        data?: FlowData,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const flow = BplusItSappiFlow.register(
            id,
            hash,
            tenantId,
            tenantCode,
            systemId,
            systemName,
            version,
            scenario,
            party,
            component,
            interfaceName,
            interfaceNamespace,
            iflowName,
            responsibleUserAccount,
            lastChangeUserAccount,
            lastChangedAt,
            folderPath,
            description,
            application,
            isCritical,
            isComplex,
            fieldGroupId,
            data,
            null,
            new FlowUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(flow);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const flowRegister = this.publisher.mergeObjectContext(
            flow
        );
        
        flowRegister.updated(flow); // apply event to model events
        flowRegister.commit(); // commit all events of model
    }
}