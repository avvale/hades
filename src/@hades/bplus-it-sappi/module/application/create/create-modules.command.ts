export class CreateModulesCommand 
{
    constructor(
        public readonly modules: {
            id: string,
            tenantId: string,
            tenantCode: string,
            systemId: string,
            systemName: string,
            channelId: string,
            channelParty?: string,
            channelComponent: string,
            channelName: string,
            flowId?: string,
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