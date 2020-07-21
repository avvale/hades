export class CreateSystemsCommand 
{
    constructor(
        public readonly systems: {
            id: string,
            tenantId: string,
            name: string,
            tenantCode: string,
            environment: string,
            version: string,
            isActive: boolean,
            cancelledAt?: string,
            
        } []
    ) {}
}