import { TenantResponse } from '@hades/iam/tenant/domain/tenant.response';



export class RoleResponse 
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly name: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
        public readonly tenant: TenantResponse,
        
        
        
    ) {}
}