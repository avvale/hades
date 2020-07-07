export class InsertContactsCommand 
{
    constructor(
        public readonly contacts: {
            id: string,
            tenantId: string,
            systemId: string,
            systemName: string,
            roleId?: string,
            roleName?: string,
            name: string,
            surname?: string,
            email: string,
            mobile?: string,
            area?: string,
            hasConsentEmail: boolean,
            hasConsentMobile: boolean,
            isActive: boolean,
            
        } []
    ) {}
}