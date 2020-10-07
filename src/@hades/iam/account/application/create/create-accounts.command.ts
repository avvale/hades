export class CreateAccountsCommand
{
    constructor(
        public readonly accounts: {
            id: string,
            type: string,
            email: string,
            isActive: boolean,
            clientId: string,
            dApplicationCodes: any,
            dPermissions: any,
            dTenants: any,
            data?: any,
            roleIds?: string[],
            tenantIds?: string[],
            
        } []
    ) {}
}