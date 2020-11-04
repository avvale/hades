import { TenantResponse } from '@hades/iam/tenant/domain/tenant.response';
import { SystemResponse } from '@hades/cci/system/domain/system.response';
import { RoleResponse } from '@hades/cci/role/domain/role.response';

export class ContactResponse
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly systemId: string,
        public readonly systemName: string,
        public readonly roleId: string,
        public readonly roleName: string,
        public readonly name: string,
        public readonly surname: string,
        public readonly email: string,
        public readonly mobile: string,
        public readonly area: string,
        public readonly hasConsentEmail: boolean,
        public readonly hasConsentMobile: boolean,
        public readonly isActive: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly tenant: TenantResponse,
        public readonly system: SystemResponse,
        public readonly role: RoleResponse,
    ) {}
}