export class InsertModulesCommand 
{
    constructor(
        public readonly modules: {
            id: string,
            tenantId: string,
            systemId: string,
            systemName: string,
            channelId: string,
            channelParty?: string,
            channelComponent: string,
            channelName: string,
            flowParty?: string,
            flowComponent: string,
            flowInterfaceName: string,
            flowInterfaceNamespace: string,
            parameterGroup?: string,
            name?: string,
            parameterName?: string,
            parameterValue?: string,
            
        } []
    ) {}
}