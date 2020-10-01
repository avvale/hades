export class CreateAccountsCommand
{
    constructor(
        public readonly accounts: {
            id: string,
            type: string,
            email: string,
            isActive: boolean,
            clientId: string,
            applicationCodes: any,
            permissions: any,
            data?: any,
            roleIds?: string[],
            tenantIds?: string[],
            
        } []
    ) {}
}