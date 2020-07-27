export class CreateExecutionsCommand 
{
    constructor(
        public readonly executions: {
            id: string,
            tenantId: string,
            tenantCode: string,
            systemId: string,
            systemName: string,
            version: string,
            type: string,
            executedAt: string,
            monitoringStartAt: string,
            monitoringEndAt: string,
            
        } []
    ) {}
}