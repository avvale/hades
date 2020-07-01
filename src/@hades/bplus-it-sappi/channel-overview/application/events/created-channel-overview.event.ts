export class CreatedChannelOverviewEvent
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
        public readonly error: number,
        public readonly inactive: number,
        public readonly successful: number,
        public readonly stopped: number,
        public readonly unknown: number,
        public readonly unregistered: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}