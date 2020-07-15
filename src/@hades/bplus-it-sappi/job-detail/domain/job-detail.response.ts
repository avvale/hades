export class JobDetailResponse 
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly systemId: string,
        public readonly systemName: string,
        public readonly executionId: string,
        public readonly executionType: string,
        public readonly executionExecutedAt: string,
        public readonly executionMonitoringStartAt: string,
        public readonly executionMonitoringEndAt: string,
        public readonly status: string,
        public readonly name: string,
        public readonly returnCode: number,
        public readonly node: string,
        public readonly user: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}