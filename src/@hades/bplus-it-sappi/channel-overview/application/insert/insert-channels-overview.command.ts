export class InsertChannelsOverviewCommand 
{
    constructor(
        public readonly channelsOverview: {
            id: string,
            tenantId: string,
            systemId: string,
            systemName: string,
            executionId: string,
            executionType: string,
            executionExecutedAt: string,
            executionMonitoringStartAt: string,
            executionMonitoringEndAt: string,
            error?: number,
            inactive?: number,
            successful?: number,
            stopped?: number,
            unknown?: number,
            unregistered?: number,
            
        } []
    ) {}
}