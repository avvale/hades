export class CreateFlowsCommand 
{
    constructor(
        public readonly flows: {
            id: string,
            tenantId: string,
            tenantCode: string,
            version: string,
            systemId: string,
            systemName: string,
            scenario: string,
            party?: string,
            component: string,
            interfaceName: string,
            interfaceNamespace: string,
            iflowName?: string,
            responsibleUserAccount?: string,
            lastChangeUserAccount?: string,
            lastChangedAt?: string,
            folderPath?: string,
            description?: string,
            application?: string,
            isCritical: boolean,
            isComplex: boolean,
            fieldGroupId?: string,
            data?: any,
            
        } []
    ) {}
}