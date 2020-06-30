export class UpdatedJobOverviewEvent
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly systemId: string,
        public readonly executionType: string,
        public readonly executionExecutedAt: string,
        public readonly executionMonitoringStartAt: string,
        public readonly executionMonitoringEndAt: string,
        public readonly cancelled: number,
        public readonly completed: number,
        public readonly error: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}