export class CreateSystemsCommand 
{
    constructor(
        public readonly systems: {
            id: string,
            tenantId: string,
            tenantCode: string,
            name: string,
            tenantCode: string,
            environment: string,
            version: string,
            isActive: boolean,
            cancelledAt?: string,
            
        } []
    ) {}
}