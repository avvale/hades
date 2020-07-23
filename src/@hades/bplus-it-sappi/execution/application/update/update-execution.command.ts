export class UpdateExecutionCommand 
{
    constructor(
        public readonly id: string,
        public readonly tenantId?: string,
        public readonly tenantCode?: string,
        public readonly systemId?: string,
        public readonly systemName?: string,
        public readonly type?: string,
        public readonly monitoringStartAt?: string,
        public readonly monitoringEndAt?: string,
        public readonly executedAt?: string,
        
    ) {}
}