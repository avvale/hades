export class CreateSystemsCommand
{
    constructor(
        public readonly systems: {
            id: string,
            tenantId: string,
            tenantCode: string,
            version: string,
            name: string,
            environment: string,
            technology: string,
            isActive: boolean,
            cancelledAt?: string,
            
        } []
    ) {}
}