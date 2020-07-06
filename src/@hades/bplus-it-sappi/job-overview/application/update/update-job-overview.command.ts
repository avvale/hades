export class UpdateJobOverviewCommand 
{
    constructor(
        public readonly id: string,
        public readonly tenantId?: string,
        public readonly systemId?: string,
        public readonly systemName?: string,
        public readonly executionId?: string,
        public readonly executionType?: string,
        public readonly executionExecutedAt?: string,
        public readonly executionMonitoringStartAt?: string,
        public readonly executionMonitoringEndAt?: string,
        public readonly cancelled?: number,
        public readonly completed?: number,
        public readonly error?: number,
        
    ) {}
}