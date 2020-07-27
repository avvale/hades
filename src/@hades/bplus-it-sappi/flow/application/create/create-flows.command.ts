export class CreateFlowsCommand 
{
    constructor(
        public readonly flows: {
            id: string,
            tenantId: string,
            tenantCode: string,
            systemId: string,
            systemName: string,
            version: string,
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