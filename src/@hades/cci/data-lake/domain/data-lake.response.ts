import { TenantResponse } from '@hades/admin/tenant/domain/tenant.response';
import { ExecutionResponse } from '@hades/cci/execution/domain/execution.response';



export class DataLakeResponse 
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly executionId: string,
        public readonly tenantCode: string,
        public readonly payload: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
        public readonly tenant: TenantResponse,
        public readonly execution: ExecutionResponse,
        
        
        
    ) {}
}