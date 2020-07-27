export class CreateChannelsDetailCommand 
{
    constructor(
        public readonly channelsDetail: {
            id: string,
            tenantId: string,
            tenantCode: string,
            systemId: string,
            systemName: string,
            executionId: string,
            executionType: string,
            executionExecutedAt: string,
            executionMonitoringStartAt: string,
            executionMonitoringEndAt: string,
            status: string,
            channelId?: string,
            channelSapId: string,
            channelParty?: string,
            channelComponent: string,
            channelName: string,
            detail?: string,
            
        } []
    ) {}
}