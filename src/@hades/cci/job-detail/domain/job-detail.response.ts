import { TenantResponse } from '@hades/iam/tenant/domain/tenant.response';
import { SystemResponse } from '@hades/cci/system/domain/system.response';
import { ExecutionResponse } from '@hades/cci/execution/domain/execution.response';

export class JobDetailResponse
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
        public readonly name: string,
        public readonly returnCode: number,
        public readonly node: string,
        public readonly user: string,
        public readonly startAt: string,
        public readonly endAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly tenant: TenantResponse,
        public readonly system: SystemResponse,
        public readonly execution: ExecutionResponse,
    ) {}
}