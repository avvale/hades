export class CreatedModuleEvent
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly systemId: string,
        public readonly systemName: string,
        public readonly channelHash: string,
        public readonly channelParty: string,
        public readonly channelComponent: string,
        public readonly channelName: string,
        public readonly flowHash: string,
        public readonly flowParty: string,
        public readonly flowComponent: string,
        public readonly flowInterfaceName: string,
        public readonly flowInterfaceNamespace: string,
        public readonly version: string,
        public readonly parameterGroup: string,
        public readonly name: string,
        public readonly parameterName: string,
        public readonly parameterValue: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}