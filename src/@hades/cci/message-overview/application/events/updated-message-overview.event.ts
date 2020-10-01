export class UpdatedMessageOverviewEvent
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly systemId: string,
        public readonly systemName: string,
        public readonly executionId: string,
        public readonly executionType: string,
        public readonly executionExecutedAt: string,
        public readonly executionMonitoringStartAt: string,
        public readonly executionMonitoringEndAt: string,
        public readonly numberMax: number,
        public readonly numberDays: number,
        public readonly success: number,
        public readonly cancelled: number,
        public readonly delivering: number,
        public readonly error: number,
        public readonly holding: number,
        public readonly toBeDelivered: number,
        public readonly waiting: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}