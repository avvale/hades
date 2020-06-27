export class UpdateExecutionCommand 
{
    constructor(
        public readonly id: string,
        public readonly tenantId?: string,
        public readonly systemId?: string,
        public readonly type?: string,
        public readonly monitoringStartAt?: string,
        public readonly monitoringEndAt?: string,
        public readonly executedAt?: string,
        
    ) {}
}