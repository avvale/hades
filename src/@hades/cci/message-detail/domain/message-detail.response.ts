import { TenantResponse } from '@hades/admin/tenant/domain/tenant.response';
import { SystemResponse } from '@hades/cci/system/domain/system.response';
import { ExecutionResponse } from '@hades/cci/execution/domain/execution.response';



export class MessageDetailResponse 
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly systemId: string,
        public readonly systemName: string,
        public readonly scenario: string,
        public readonly executionId: string,
        public readonly executionType: string,
        public readonly executionExecutedAt: string,
        public readonly executionMonitoringStartAt: string,
        public readonly executionMonitoringEndAt: string,
        public readonly flowHash: string,
        public readonly flowParty: string,
        public readonly flowReceiverParty: string,
        public readonly flowComponent: string,
        public readonly flowReceiverComponent: string,
        public readonly flowInterfaceName: string,
        public readonly flowInterfaceNamespace: string,
        public readonly status: string,
        public readonly refMessageId: string,
        public readonly detail: string,
        public readonly example: string,
        public readonly startTimeAt: string,
        public readonly direction: string,
        public readonly errorCategory: string,
        public readonly errorCode: string,
        public readonly errorLabel: number,
        public readonly node: number,
        public readonly protocol: string,
        public readonly qualityOfService: string,
        public readonly receiverParty: string,
        public readonly receiverComponent: string,
        public readonly receiverInterface: string,
        public readonly receiverInterfaceNamespace: string,
        public readonly retries: number,
        public readonly size: number,
        public readonly timesFailed: number,
        public readonly numberMax: number,
        public readonly numberDays: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
        public readonly tenant: TenantResponse,
        public readonly system: SystemResponse,
        public readonly execution: ExecutionResponse,
        
        
        
    ) {}
}