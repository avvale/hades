export class InsertChannelsDetailCommand 
{
    constructor(
        public readonly channelsDetail: {
            id: string,
            tenantId: string,
            systemId: string,
            systemName: string,
            executionId: string,
            executionType: string,
            executionExecutedAt: string,
            executionMonitoringStartAt: string,
            executionMonitoringEndAt: string,
            status: string,
            channelId: string,
            channelParty?: string,
            channelComponent: string,
            channelName: string,
            detail?: string,
            example?: string,
            
        } []
    ) {}
}