export class CreateModulesCommand 
{
    constructor(
        public readonly modules: {
            id: string,
            tenantId: string,
            tenantCode: string,
            systemId: string,
            systemName: string,
            channelHash: string,
            channelParty?: string,
            channelComponent: string,
            channelName: string,
            flowHash: string,
            flowParty?: string,
            flowComponent: string,
            flowInterfaceName: string,
            flowInterfaceNamespace: string,
            version: string,
            parameterGroup?: string,
            name?: string,
            parameterName?: string,
            parameterValue?: string,
            
        } []
    ) {}
}