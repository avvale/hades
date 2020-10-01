import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ChannelId,
    ChannelHash,
    ChannelTenantId,
    ChannelTenantCode,
    ChannelSystemId,
    ChannelSystemName,
    ChannelParty,
    ChannelComponent,
    ChannelName,
    ChannelFlowHash,
    ChannelFlowParty,
    ChannelFlowReceiverParty,
    ChannelFlowComponent,
    ChannelFlowReceiverComponent,
    ChannelFlowInterfaceName,
    ChannelFlowInterfaceNamespace,
    ChannelVersion,
    ChannelAdapterType,
    ChannelDirection,
    ChannelTransportProtocol,
    ChannelMessageProtocol,
    ChannelAdapterEngineName,
    ChannelUrl,
    ChannelUsername,
    ChannelRemoteHost,
    ChannelRemotePort,
    ChannelDirectory,
    ChannelFileSchema,
    ChannelProxyHost,
    ChannelProxyPort,
    ChannelDestination,
    ChannelAdapterStatus,
    ChannelSoftwareComponentName,
    ChannelResponsibleUserAccountName,
    ChannelLastChangeUserAccount,
    ChannelLastChangedAt,
    ChannelRiInterfaceName,
    ChannelRiInterfaceNamespace,
    ChannelCreatedAt,
    ChannelUpdatedAt,
    ChannelDeletedAt
    
} from './value-objects';
import { CreatedChannelEvent } from './../application/events/created-channel.event';
import { UpdatedChannelEvent } from './../application/events/updated-channel.event';
import { DeletedChannelEvent } from './../application/events/deleted-channel.event';
import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';
import { CciSystem } from '@hades/cci/system/domain/system.aggregate';



export class CciChannel extends AggregateRoot
{
    id: ChannelId;
    hash: ChannelHash;
    tenantId: ChannelTenantId;
    tenantCode: ChannelTenantCode;
    systemId: ChannelSystemId;
    systemName: ChannelSystemName;
    party: ChannelParty;
    component: ChannelComponent;
    name: ChannelName;
    flowHash: ChannelFlowHash;
    flowParty: ChannelFlowParty;
    flowReceiverParty: ChannelFlowReceiverParty;
    flowComponent: ChannelFlowComponent;
    flowReceiverComponent: ChannelFlowReceiverComponent;
    flowInterfaceName: ChannelFlowInterfaceName;
    flowInterfaceNamespace: ChannelFlowInterfaceNamespace;
    version: ChannelVersion;
    adapterType: ChannelAdapterType;
    direction: ChannelDirection;
    transportProtocol: ChannelTransportProtocol;
    messageProtocol: ChannelMessageProtocol;
    adapterEngineName: ChannelAdapterEngineName;
    url: ChannelUrl;
    username: ChannelUsername;
    remoteHost: ChannelRemoteHost;
    remotePort: ChannelRemotePort;
    directory: ChannelDirectory;
    fileSchema: ChannelFileSchema;
    proxyHost: ChannelProxyHost;
    proxyPort: ChannelProxyPort;
    destination: ChannelDestination;
    adapterStatus: ChannelAdapterStatus;
    softwareComponentName: ChannelSoftwareComponentName;
    responsibleUserAccountName: ChannelResponsibleUserAccountName;
    lastChangeUserAccount: ChannelLastChangeUserAccount;
    lastChangedAt: ChannelLastChangedAt;
    riInterfaceName: ChannelRiInterfaceName;
    riInterfaceNamespace: ChannelRiInterfaceNamespace;
    createdAt: ChannelCreatedAt;
    updatedAt: ChannelUpdatedAt;
    deletedAt: ChannelDeletedAt;
    
    // eager relationship
    tenant: IamTenant;
    system: CciSystem;
    
    
    
    constructor(id?: ChannelId, hash?: ChannelHash, tenantId?: ChannelTenantId, tenantCode?: ChannelTenantCode, systemId?: ChannelSystemId, systemName?: ChannelSystemName, party?: ChannelParty, component?: ChannelComponent, name?: ChannelName, flowHash?: ChannelFlowHash, flowParty?: ChannelFlowParty, flowReceiverParty?: ChannelFlowReceiverParty, flowComponent?: ChannelFlowComponent, flowReceiverComponent?: ChannelFlowReceiverComponent, flowInterfaceName?: ChannelFlowInterfaceName, flowInterfaceNamespace?: ChannelFlowInterfaceNamespace, version?: ChannelVersion, adapterType?: ChannelAdapterType, direction?: ChannelDirection, transportProtocol?: ChannelTransportProtocol, messageProtocol?: ChannelMessageProtocol, adapterEngineName?: ChannelAdapterEngineName, url?: ChannelUrl, username?: ChannelUsername, remoteHost?: ChannelRemoteHost, remotePort?: ChannelRemotePort, directory?: ChannelDirectory, fileSchema?: ChannelFileSchema, proxyHost?: ChannelProxyHost, proxyPort?: ChannelProxyPort, destination?: ChannelDestination, adapterStatus?: ChannelAdapterStatus, softwareComponentName?: ChannelSoftwareComponentName, responsibleUserAccountName?: ChannelResponsibleUserAccountName, lastChangeUserAccount?: ChannelLastChangeUserAccount, lastChangedAt?: ChannelLastChangedAt, riInterfaceName?: ChannelRiInterfaceName, riInterfaceNamespace?: ChannelRiInterfaceNamespace, createdAt?: ChannelCreatedAt, updatedAt?: ChannelUpdatedAt, deletedAt?: ChannelDeletedAt, tenant?: IamTenant, system?: CciSystem, )
    {
        super();
        
        this.id = id;
        this.hash = hash;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.systemId = systemId;
        this.systemName = systemName;
        this.party = party;
        this.component = component;
        this.name = name;
        this.flowHash = flowHash;
        this.flowParty = flowParty;
        this.flowReceiverParty = flowReceiverParty;
        this.flowComponent = flowComponent;
        this.flowReceiverComponent = flowReceiverComponent;
        this.flowInterfaceName = flowInterfaceName;
        this.flowInterfaceNamespace = flowInterfaceNamespace;
        this.version = version;
        this.adapterType = adapterType;
        this.direction = direction;
        this.transportProtocol = transportProtocol;
        this.messageProtocol = messageProtocol;
        this.adapterEngineName = adapterEngineName;
        this.url = url;
        this.username = username;
        this.remoteHost = remoteHost;
        this.remotePort = remotePort;
        this.directory = directory;
        this.fileSchema = fileSchema;
        this.proxyHost = proxyHost;
        this.proxyPort = proxyPort;
        this.destination = destination;
        this.adapterStatus = adapterStatus;
        this.softwareComponentName = softwareComponentName;
        this.responsibleUserAccountName = responsibleUserAccountName;
        this.lastChangeUserAccount = lastChangeUserAccount;
        this.lastChangedAt = lastChangedAt;
        this.riInterfaceName = riInterfaceName;
        this.riInterfaceNamespace = riInterfaceNamespace;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
        // eager relationship
        this.tenant = tenant;
        this.system = system;
        
        
        
    }

    static register (id: ChannelId, hash: ChannelHash, tenantId: ChannelTenantId, tenantCode: ChannelTenantCode, systemId: ChannelSystemId, systemName: ChannelSystemName, party: ChannelParty, component: ChannelComponent, name: ChannelName, flowHash: ChannelFlowHash, flowParty: ChannelFlowParty, flowReceiverParty: ChannelFlowReceiverParty, flowComponent: ChannelFlowComponent, flowReceiverComponent: ChannelFlowReceiverComponent, flowInterfaceName: ChannelFlowInterfaceName, flowInterfaceNamespace: ChannelFlowInterfaceNamespace, version: ChannelVersion, adapterType: ChannelAdapterType, direction: ChannelDirection, transportProtocol: ChannelTransportProtocol, messageProtocol: ChannelMessageProtocol, adapterEngineName: ChannelAdapterEngineName, url: ChannelUrl, username: ChannelUsername, remoteHost: ChannelRemoteHost, remotePort: ChannelRemotePort, directory: ChannelDirectory, fileSchema: ChannelFileSchema, proxyHost: ChannelProxyHost, proxyPort: ChannelProxyPort, destination: ChannelDestination, adapterStatus: ChannelAdapterStatus, softwareComponentName: ChannelSoftwareComponentName, responsibleUserAccountName: ChannelResponsibleUserAccountName, lastChangeUserAccount: ChannelLastChangeUserAccount, lastChangedAt: ChannelLastChangedAt, riInterfaceName: ChannelRiInterfaceName, riInterfaceNamespace: ChannelRiInterfaceNamespace, createdAt: ChannelCreatedAt, updatedAt: ChannelUpdatedAt, deletedAt: ChannelDeletedAt, tenant?: IamTenant, system?: CciSystem, ): CciChannel
    {
        return new CciChannel(id, hash, tenantId, tenantCode, systemId, systemName, party, component, name, flowHash, flowParty, flowReceiverParty, flowComponent, flowReceiverComponent, flowInterfaceName, flowInterfaceNamespace, version, adapterType, direction, transportProtocol, messageProtocol, adapterEngineName, url, username, remoteHost, remotePort, directory, fileSchema, proxyHost, proxyPort, destination, adapterStatus, softwareComponentName, responsibleUserAccountName, lastChangeUserAccount, lastChangedAt, riInterfaceName, riInterfaceNamespace, createdAt, updatedAt, deletedAt, tenant, system, );
    }

    created(channel: CciChannel): void
    {
        this.apply(
            new CreatedChannelEvent(
                channel.id.value,
                channel.hash.value,
                channel.tenantId.value,
                channel.tenantCode.value,
                channel.systemId.value,
                channel.systemName.value,
                channel.party?.value,
                channel.component.value,
                channel.name.value,
                channel.flowHash?.value,
                channel.flowParty?.value,
                channel.flowReceiverParty?.value,
                channel.flowComponent?.value,
                channel.flowReceiverComponent?.value,
                channel.flowInterfaceName?.value,
                channel.flowInterfaceNamespace?.value,
                channel.version?.value,
                channel.adapterType?.value,
                channel.direction?.value,
                channel.transportProtocol?.value,
                channel.messageProtocol?.value,
                channel.adapterEngineName?.value,
                channel.url?.value,
                channel.username?.value,
                channel.remoteHost?.value,
                channel.remotePort?.value,
                channel.directory?.value,
                channel.fileSchema?.value,
                channel.proxyHost?.value,
                channel.proxyPort?.value,
                channel.destination?.value,
                channel.adapterStatus?.value,
                channel.softwareComponentName?.value,
                channel.responsibleUserAccountName?.value,
                channel.lastChangeUserAccount?.value,
                channel.lastChangedAt?.value,
                channel.riInterfaceName?.value,
                channel.riInterfaceNamespace?.value,
                channel.createdAt?.value,
                channel.updatedAt?.value,
                channel.deletedAt?.value,
                
            )
        );
    }

    updated(channel: CciChannel): void
    {
        this.apply(
            new UpdatedChannelEvent(
                channel.id.value,
                channel.hash?.value,
                channel.tenantId?.value,
                channel.tenantCode?.value,
                channel.systemId?.value,
                channel.systemName?.value,
                channel.party?.value,
                channel.component?.value,
                channel.name?.value,
                channel.flowHash?.value,
                channel.flowParty?.value,
                channel.flowReceiverParty?.value,
                channel.flowComponent?.value,
                channel.flowReceiverComponent?.value,
                channel.flowInterfaceName?.value,
                channel.flowInterfaceNamespace?.value,
                channel.version?.value,
                channel.adapterType?.value,
                channel.direction?.value,
                channel.transportProtocol?.value,
                channel.messageProtocol?.value,
                channel.adapterEngineName?.value,
                channel.url?.value,
                channel.username?.value,
                channel.remoteHost?.value,
                channel.remotePort?.value,
                channel.directory?.value,
                channel.fileSchema?.value,
                channel.proxyHost?.value,
                channel.proxyPort?.value,
                channel.destination?.value,
                channel.adapterStatus?.value,
                channel.softwareComponentName?.value,
                channel.responsibleUserAccountName?.value,
                channel.lastChangeUserAccount?.value,
                channel.lastChangedAt?.value,
                channel.riInterfaceName?.value,
                channel.riInterfaceNamespace?.value,
                channel.createdAt?.value,
                channel.updatedAt?.value,
                channel.deletedAt?.value,
                
            )
        );
    }

    deleted(channel: CciChannel): void
    {
        this.apply(
            new DeletedChannelEvent(
                channel.id.value,
                channel.hash.value,
                channel.tenantId.value,
                channel.tenantCode.value,
                channel.systemId.value,
                channel.systemName.value,
                channel.party?.value,
                channel.component.value,
                channel.name.value,
                channel.flowHash?.value,
                channel.flowParty?.value,
                channel.flowReceiverParty?.value,
                channel.flowComponent?.value,
                channel.flowReceiverComponent?.value,
                channel.flowInterfaceName?.value,
                channel.flowInterfaceNamespace?.value,
                channel.version?.value,
                channel.adapterType?.value,
                channel.direction?.value,
                channel.transportProtocol?.value,
                channel.messageProtocol?.value,
                channel.adapterEngineName?.value,
                channel.url?.value,
                channel.username?.value,
                channel.remoteHost?.value,
                channel.remotePort?.value,
                channel.directory?.value,
                channel.fileSchema?.value,
                channel.proxyHost?.value,
                channel.proxyPort?.value,
                channel.destination?.value,
                channel.adapterStatus?.value,
                channel.softwareComponentName?.value,
                channel.responsibleUserAccountName?.value,
                channel.lastChangeUserAccount?.value,
                channel.lastChangedAt?.value,
                channel.riInterfaceName?.value,
                channel.riInterfaceNamespace?.value,
                channel.createdAt?.value,
                channel.updatedAt?.value,
                channel.deletedAt?.value,
                
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
            party: this.party?.value,
            component: this.component.value,
            name: this.name.value,
            flowHash: this.flowHash?.value,
            flowParty: this.flowParty?.value,
            flowReceiverParty: this.flowReceiverParty?.value,
            flowComponent: this.flowComponent?.value,
            flowReceiverComponent: this.flowReceiverComponent?.value,
            flowInterfaceName: this.flowInterfaceName?.value,
            flowInterfaceNamespace: this.flowInterfaceNamespace?.value,
            version: this.version?.value,
            adapterType: this.adapterType?.value,
            direction: this.direction?.value,
            transportProtocol: this.transportProtocol?.value,
            messageProtocol: this.messageProtocol?.value,
            adapterEngineName: this.adapterEngineName?.value,
            url: this.url?.value,
            username: this.username?.value,
            remoteHost: this.remoteHost?.value,
            remotePort: this.remotePort?.value,
            directory: this.directory?.value,
            fileSchema: this.fileSchema?.value,
            proxyHost: this.proxyHost?.value,
            proxyPort: this.proxyPort?.value,
            destination: this.destination?.value,
            adapterStatus: this.adapterStatus?.value,
            softwareComponentName: this.softwareComponentName?.value,
            responsibleUserAccountName: this.responsibleUserAccountName?.value,
            lastChangeUserAccount: this.lastChangeUserAccount?.value,
            lastChangedAt: this.lastChangedAt?.value,
            riInterfaceName: this.riInterfaceName?.value,
            riInterfaceNamespace: this.riInterfaceNamespace?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
            // eager relationship
            tenant: this.tenant?.toDTO(),
            system: this.system?.toDTO(),
            
            
            
        }
    }
}
