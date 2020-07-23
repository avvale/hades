export class DeletedChannelDetailEvent
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
        public readonly status: string,
        public readonly channelId: string,
        public readonly channelSapId: string,
        public readonly channelParty: string,
        public readonly channelComponent: string,
        public readonly channelName: string,
        public readonly detail: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}