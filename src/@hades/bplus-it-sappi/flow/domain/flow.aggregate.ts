import { AggregateRoot } from '@nestjs/cqrs';
import { 
    FlowId, 
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
    
} from './value-objects';
import { CreatedFlowEvent } from './../application/events/created-flow.event';
import { UpdatedFlowEvent } from './../application/events/updated-flow.event';
import { DeletedFlowEvent } from './../application/events/deleted-flow.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.aggregate';

export class BplusItSappiFlow extends AggregateRoot
{
    id: FlowId;
    tenantId: FlowTenantId;
    tenant: AdminTenant;
    tenantCode: FlowTenantCode;
    systemId: FlowSystemId;
    system: BplusItSappiSystem;
    systemName: FlowSystemName;
    version: FlowVersion;
    scenario: FlowScenario;
    party: FlowParty;
    component: FlowComponent;
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
    
    constructor(id?: FlowId, tenantId?: FlowTenantId, tenantCode?: FlowTenantCode, systemId?: FlowSystemId, systemName?: FlowSystemName, version?: FlowVersion, scenario?: FlowScenario, party?: FlowParty, component?: FlowComponent, interfaceName?: FlowInterfaceName, interfaceNamespace?: FlowInterfaceNamespace, iflowName?: FlowIflowName, responsibleUserAccount?: FlowResponsibleUserAccount, lastChangeUserAccount?: FlowLastChangeUserAccount, lastChangedAt?: FlowLastChangedAt, folderPath?: FlowFolderPath, description?: FlowDescription, application?: FlowApplication, isCritical?: FlowIsCritical, isComplex?: FlowIsComplex, fieldGroupId?: FlowFieldGroupId, data?: FlowData, createdAt?: FlowCreatedAt, updatedAt?: FlowUpdatedAt, deletedAt?: FlowDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.systemId = systemId;
        this.systemName = systemName;
        this.version = version;
        this.scenario = scenario;
        this.party = party;
        this.component = component;
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
        
    }

    static register (id: FlowId, tenantId: FlowTenantId, tenantCode: FlowTenantCode, systemId: FlowSystemId, systemName: FlowSystemName, version: FlowVersion, scenario: FlowScenario, party: FlowParty, component: FlowComponent, interfaceName: FlowInterfaceName, interfaceNamespace: FlowInterfaceNamespace, iflowName: FlowIflowName, responsibleUserAccount: FlowResponsibleUserAccount, lastChangeUserAccount: FlowLastChangeUserAccount, lastChangedAt: FlowLastChangedAt, folderPath: FlowFolderPath, description: FlowDescription, application: FlowApplication, isCritical: FlowIsCritical, isComplex: FlowIsComplex, fieldGroupId: FlowFieldGroupId, data: FlowData, createdAt: FlowCreatedAt, updatedAt: FlowUpdatedAt, deletedAt: FlowDeletedAt, ): BplusItSappiFlow
    {
        return new BplusItSappiFlow(id, tenantId, tenantCode, systemId, systemName, version, scenario, party, component, interfaceName, interfaceNamespace, iflowName, responsibleUserAccount, lastChangeUserAccount, lastChangedAt, folderPath, description, application, isCritical, isComplex, fieldGroupId, data, createdAt, updatedAt, deletedAt, );
    }

    created(flow: BplusItSappiFlow): void
    {
        this.apply(
            new CreatedFlowEvent(
                flow.id.value,
                flow.tenantId.value,
                flow.tenantCode.value,
                flow.systemId.value,
                flow.systemName.value,
                flow.version.value,
                flow.scenario.value,
                flow.party?.value,
                flow.component.value,
                flow.interfaceName.value,
                flow.interfaceNamespace.value,
                flow.iflowName?.value,
                flow.responsibleUserAccount?.value,
                flow.lastChangeUserAccount?.value,
                flow.lastChangedAt?.value,
                flow.folderPath?.value,
                flow.description?.value,
                flow.application?.value,
                flow.isCritical.value,
                flow.isComplex.value,
                flow.fieldGroupId?.value,
                flow.data?.value,
                flow.createdAt?.value,
                flow.updatedAt?.value,
                flow.deletedAt?.value,
                
            )
        );
    }

    updated(flow: BplusItSappiFlow): void
    {
        this.apply(
            new UpdatedFlowEvent(
                flow.id.value,
                flow.tenantId?.value,
                flow.tenantCode?.value,
                flow.systemId?.value,
                flow.systemName?.value,
                flow.version?.value,
                flow.scenario?.value,
                flow.party?.value,
                flow.component?.value,
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

    deleted(flow: BplusItSappiFlow): void
    {
        this.apply(
            new DeletedFlowEvent(
                flow.id.value,
                flow.tenantId.value,
                flow.tenantCode.value,
                flow.systemId.value,
                flow.systemName.value,
                flow.version.value,
                flow.scenario.value,
                flow.party?.value,
                flow.component.value,
                flow.interfaceName.value,
                flow.interfaceNamespace.value,
                flow.iflowName?.value,
                flow.responsibleUserAccount?.value,
                flow.lastChangeUserAccount?.value,
                flow.lastChangedAt?.value,
                flow.folderPath?.value,
                flow.description?.value,
                flow.application?.value,
                flow.isCritical.value,
                flow.isComplex.value,
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
            tenantId: this.tenantId.value,
            tenantCode: this.tenantCode.value,
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            version: this.version.value,
            scenario: this.scenario.value,
            party: this.party?.value,
            component: this.component.value,
            interfaceName: this.interfaceName.value,
            interfaceNamespace: this.interfaceNamespace.value,
            iflowName: this.iflowName?.value,
            responsibleUserAccount: this.responsibleUserAccount?.value,
            lastChangeUserAccount: this.lastChangeUserAccount?.value,
            lastChangedAt: this.lastChangedAt?.value,
            folderPath: this.folderPath?.value,
            description: this.description?.value,
            application: this.application?.value,
            isCritical: this.isCritical.value,
            isComplex: this.isComplex.value,
            fieldGroupId: this.fieldGroupId?.value,
            data: this.data?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
