export class CreateExecutionsCommand 
{
    constructor(
        public readonly executions: {
            id: string,
            tenantId: string,
            systemId: string,
            type: string,
            monitoringStartAt: string,
            monitoringEndAt: string,
            executedAt: string,
            
        } []
    ) {}
}