export class CreateExecutionsCommand 
{
    constructor(
        public readonly executions: {
            id: string,
            tenantId: string,
            tenantCode: string,
            version: string,
            systemId: string,
            systemName: string,
            type: string,
            monitoringStartAt: string,
            monitoringEndAt: string,
            executedAt: string,
            
        } []
    ) {}
}