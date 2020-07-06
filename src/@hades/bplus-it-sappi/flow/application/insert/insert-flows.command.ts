export class InsertFlowsCommand 
{
    constructor(
        public readonly flows: {
            id: string,
            tenantId: string,
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
            contactsIdId: string[],
            
        } []
    ) {}
}