export class FlowResponse 
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly systemId: string,
        public readonly systemName: string,
        public readonly scenario: string,
        public readonly party: string,
        public readonly component: string,
        public readonly interfaceName: string,
        public readonly interfaceNamespace: string,
        public readonly iflowName: string,
        public readonly responsibleUserAccount: string,
        public readonly lastChangeUserAccount: string,
        public readonly lastChangedAt: string,
        public readonly folderPath: string,
        public readonly description: string,
        public readonly application: string,
        public readonly isCritical: boolean,
        public readonly isComplex: boolean,
        public readonly fieldGroupId: string,
        public readonly data: any,
        public readonly contactsIdId: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}