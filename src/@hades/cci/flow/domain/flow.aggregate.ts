import { AggregateRoot } from '@nestjs/cqrs';
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
    FlowDeletedAt
    
} from './value-objects';
import { CreatedFlowEvent } from './../application/events/created-flow.event';
import { UpdatedFlowEvent } from './../application/events/updated-flow.event';
import { DeletedFlowEvent } from './../application/events/deleted-flow.event';
import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';
import { CciSystem } from '@hades/cci/system/domain/system.aggregate';



export class CciFlow extends AggregateRoot
{
    id: FlowId;
    hash: FlowHash;
    tenantId: FlowTenantId;
    tenantCode: FlowTenantCode;
    systemId: FlowSystemId;
    systemName: FlowSystemName;
    version: FlowVersion;
    scenario: FlowScenario;
    party: FlowParty;
    receiverParty: FlowReceiverParty;
    component: FlowComponent;
    receiverComponent: FlowReceiverComponent;
    interfaceName: FlowInterfaceName;
    interfaceNamespace: FlowInterfaceNamespace;
    iflowName: FlowIflowName;
    responsibleUserAccount: FlowResponsibleUserAccount;
    lastChangeUserAccount: FlowLastChangeUserAccount;
    lastChangedAt: FlowLastChangedAt;
    folderPath: FlowFolderPath;
    description: FlowDescription;
    application: FlowApplication;
    isCritical: FlowIsCritical;
    isComplex: FlowIsComplex;
    fieldGroupId: FlowFieldGroupId;
    data: FlowData;
    createdAt: FlowCreatedAt;
    updatedAt: FlowUpdatedAt;
    deletedAt: FlowDeletedAt;
    
    // eager relationship
    tenant: IamTenant;
    system: CciSystem;
    
    
    
    constructor(id?: FlowId, hash?: FlowHash, tenantId?: FlowTenantId, tenantCode?: FlowTenantCode, systemId?: FlowSystemId, systemName?: FlowSystemName, version?: FlowVersion, scenario?: FlowScenario, party?: FlowParty, receiverParty?: FlowReceiverParty, component?: FlowComponent, receiverComponent?: FlowReceiverComponent, interfaceName?: FlowInterfaceName, interfaceNamespace?: FlowInterfaceNamespace, iflowName?: FlowIflowName, responsibleUserAccount?: FlowResponsibleUserAccount, lastChangeUserAccount?: FlowLastChangeUserAccount, lastChangedAt?: FlowLastChangedAt, folderPath?: FlowFolderPath, description?: FlowDescription, application?: FlowApplication, isCritical?: FlowIsCritical, isComplex?: FlowIsComplex, fieldGroupId?: FlowFieldGroupId, data?: FlowData, createdAt?: FlowCreatedAt, updatedAt?: FlowUpdatedAt, deletedAt?: FlowDeletedAt, tenant?: IamTenant, system?: CciSystem, )
    {
        super();
        
        this.id = id;
        this.hash = hash;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.systemId = systemId;
        this.systemName = systemName;
        this.version = version;
        this.scenario = scenario;
        this.party = party;
        this.receiverParty = receiverParty;
        this.component = component;
        this.receiverComponent = receiverComponent;
        this.interfaceName = interfaceName;
        this.interfaceNamespace = interfaceNamespace;
        this.iflowName = iflowName;
        this.responsibleUserAccount = responsibleUserAccount;
        this.lastChangeUserAccount = lastChangeUserAccount;
        this.lastChangedAt = lastChangedAt;
        this.folderPath = folderPath;
        this.description = description;
        this.application = application;
        this.isCritical = isCritical;
        this.isComplex = isComplex;
        this.fieldGroupId = fieldGroupId;
        this.data = data;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
        // eager relationship
        this.tenant = tenant;
        this.system = system;
        
        
        
    }

    static register (id: FlowId, hash: FlowHash, tenantId: FlowTenantId, tenantCode: FlowTenantCode, systemId: FlowSystemId, systemName: FlowSystemName, version: FlowVersion, scenario: FlowScenario, party: FlowParty, receiverParty: FlowReceiverParty, component: FlowComponent, receiverComponent: FlowReceiverComponent, interfaceName: FlowInterfaceName, interfaceNamespace: FlowInterfaceNamespace, iflowName: FlowIflowName, responsibleUserAccount: FlowResponsibleUserAccount, lastChangeUserAccount: FlowLastChangeUserAccount, lastChangedAt: FlowLastChangedAt, folderPath: FlowFolderPath, description: FlowDescription, application: FlowApplication, isCritical: FlowIsCritical, isComplex: FlowIsComplex, fieldGroupId: FlowFieldGroupId, data: FlowData, createdAt: FlowCreatedAt, updatedAt: FlowUpdatedAt, deletedAt: FlowDeletedAt, tenant?: IamTenant, system?: CciSystem, ): CciFlow
    {
        return new CciFlow(id, hash, tenantId, tenantCode, systemId, systemName, version, scenario, party, receiverParty, component, receiverComponent, interfaceName, interfaceNamespace, iflowName, responsibleUserAccount, lastChangeUserAccount, lastChangedAt, folderPath, description, application, isCritical, isComplex, fieldGroupId, data, createdAt, updatedAt, deletedAt, tenant, system, );
    }

    created(flow: CciFlow): void
    {
        this.apply(
            new CreatedFlowEvent(
                flow.id.value,
                flow.hash.value,
                flow.tenantId.value,
                flow.tenantCode.value,
                flow.systemId.value,
                flow.systemName.value,
                flow.version.value,
                flow.scenario?.value,
                flow.party?.value,
                flow.receiverParty?.value,
                flow.component.value,
                flow.receiverComponent?.value,
                flow.interfaceName.value,
                flow.interfaceNamespace.value,
                flow.iflowName?.value,
                flow.responsibleUserAccount?.value,
                flow.lastChangeUserAccount?.value,
                flow.lastChangedAt?.value,
                flow.folderPath?.value,
                flow.description?.value,
                flow.application?.value,
                flow.isCritical?.value,
                flow.isComplex?.value,
                flow.fieldGroupId?.value,
                flow.data?.value,
                flow.createdAt?.value,
                flow.updatedAt?.value,
                flow.deletedAt?.value,
                
            )
        );
    }

    updated(flow: CciFlow): void
    {
        this.apply(
            new UpdatedFlowEvent(
                flow.id.value,
                flow.hash?.value,
                flow.tenantId?.value,
                flow.tenantCode?.value,
                flow.systemId?.value,
                flow.systemName?.value,
                flow.version?.value,
                flow.scenario?.value,
                flow.party?.value,
                flow.receiverParty?.value,
                flow.component?.value,
                flow.receiverComponent?.value,
                flow.interfaceName?.value,
                flow.interfaceNamespace?.value,
                flow.iflowName?.value,
                flow.responsibleUserAccount?.value,
                flow.lastChangeUserAccount?.value,
                flow.lastChangedAt?.value,
                flow.folderPath?.value,
                flow.description?.value,
                flow.application?.value,
                flow.isCritical?.value,
                flow.isComplex?.value,
                flow.fieldGroupId?.value,
                flow.data?.value,
                flow.createdAt?.value,
                flow.updatedAt?.value,
                flow.deletedAt?.value,
                
            )
        );
    }

    deleted(flow: CciFlow): void
    {
        this.apply(
            new DeletedFlowEvent(
                flow.id.value,
                flow.hash.value,
                flow.tenantId.value,
                flow.tenantCode.value,
                flow.systemId.value,
                flow.systemName.value,
                flow.version.value,
                flow.scenario?.value,
                flow.party?.value,
                flow.receiverParty?.value,
                flow.component.value,
                flow.receiverComponent?.value,
                flow.interfaceName.value,
                flow.interfaceNamespace.value,
                flow.iflowName?.value,
                flow.responsibleUserAccount?.value,
                flow.lastChangeUserAccount?.value,
                flow.lastChangedAt?.value,
                flow.folderPath?.value,
                flow.description?.value,
                flow.application?.value,
                flow.isCritical?.value,
                flow.isComplex?.value,
                flow.fieldGroupId?.value,
                flow.data?.value,
                flow.createdAt?.value,
                flow.updatedAt?.value,
                flow.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            hash: this.hash.value,
            tenantId: this.tenantId.value,
            tenantCode: this.tenantCode.value,
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            version: this.version.value,
            scenario: this.scenario?.value,
            party: this.party?.value,
            receiverParty: this.receiverParty?.value,
            component: this.component.value,
            receiverComponent: this.receiverComponent?.value,
            interfaceName: this.interfaceName.value,
            interfaceNamespace: this.interfaceNamespace.value,
            iflowName: this.iflowName?.value,
            responsibleUserAccount: this.responsibleUserAccount?.value,
            lastChangeUserAccount: this.lastChangeUserAccount?.value,
            lastChangedAt: this.lastChangedAt?.value,
            folderPath: this.folderPath?.value,
            description: this.description?.value,
            application: this.application?.value,
            isCritical: this.isCritical?.value,
            isComplex: this.isComplex?.value,
            fieldGroupId: this.fieldGroupId?.value,
            data: this.data?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
            // eager relationship
            tenant: this.tenant?.toDTO(),
            system: this.system?.toDTO(),
            
            
            
        }
    }
}
