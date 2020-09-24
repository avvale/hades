export class CreateAccountsCommand
{
    constructor(
        public readonly accounts: {
            id: string,
            type: string,
            name: string,
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