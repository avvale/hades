import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateFlowCommand
{
    constructor(
        public readonly payload: {
            id: string,
            hash: string,
            tenantId: string,
            tenantCode: string,
            systemId: string,
            systemName: string,
            version: string,
            scenario?: string,
            party?: string,
            receiverParty?: string,
            component: string,
            receiverComponent?: string,
            interfaceName: string,
            interfaceNamespace: string,
            iflowName?: string,
            responsibleUserAccount?: string,
            lastChangeUserAccount?: string,
            lastChangedAt?: string,
            folderPath?: string,
            description?: string,
            application?: string,
            isCritical?: boolean,
            isComplex?: boolean,
            fieldGroupId?: string,
            data?: any,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}