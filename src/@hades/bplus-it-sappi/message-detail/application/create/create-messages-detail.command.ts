export class CreateMessagesDetailCommand 
{
    constructor(
        public readonly messagesDetail: {
            id: string,
            tenantId: string,
            tenantCode: string,
            systemId: string,
            systemName: string,
            scenario?: string,
            executionId: string,
            executionType: string,
            executionExecutedAt: string,
            executionMonitoringStartAt: string,
            executionMonitoringEndAt: string,
            flowId?: string,
            flowParty?: string,
            flowComponent: string,
            flowInterfaceName: string,
            flowInterfaceNamespace: string,
            status: string,
            detail?: string,
            example?: string,
            startTimeAt?: string,
            direction: string,
            errorCategory?: string,
            errorCode?: string,
            errorLabel?: number,
            node?: number,
            protocol?: string,
            qualityOfService?: string,
            receiverParty?: string,
            receiverComponent?: string,
            receiverInterface?: string,
            receiverInterfaceNamespace?: string,
            retries?: number,
            size?: number,
            timesFailed?: number,
            
        } []
    ) {}
}