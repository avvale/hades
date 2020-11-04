import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateModulesCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId: string,
            tenantCode: string,
            systemId: string,
            systemName: string,
            channelHash: string,
            channelParty?: string,
            channelComponent: string,
            channelName: string,
            flowHash?: string,
            flowParty?: string,
            flowReceiverParty?: string,
            flowComponent?: string,
            flowReceiverComponent?: string,
            flowInterfaceName?: string,
            flowInterfaceNamespace?: string,
            version: string,
            parameterGroup?: string,
            name?: string,
            parameterName?: string,
            parameterValue?: string,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}