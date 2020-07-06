export class CreateChannelCommand 
{   
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly systemId: string,
        public readonly party: string,
        public readonly component: string,
        public readonly name: string,
        public readonly flowParty: string,
        public readonly flowComponent: string,
        public readonly flowInterfaceName: string,
        public readonly flowInterfaceNamespace: string,
        public readonly adapterType: string,
        public readonly direction: string,
        public readonly transportProtocol: string,
        public readonly messageProtocol: string,
        public readonly adapterEngineName: string,
        public readonly url: string,
        public readonly username: string,
        public readonly remoteHost: string,
        public readonly remotePort: string,
        public readonly directory: string,
        public readonly fileSchema: string,
        public readonly proxyHost: string,
        public readonly proxyPort: string,
        public readonly destination: string,
        public readonly adapterStatus: string,
        public readonly softwareComponentName: string,
        public readonly responsibleUserAccountName: string,
        public readonly lastChangeUserAccount: string,
        public readonly lastChangedAt: string,
        
    ) {}
}