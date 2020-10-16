


import { PermissionResponse } from '@hades/iam/permission/domain/permission.response';
import { AccountResponse } from '@hades/iam/account/domain/account.response';

export class RoleResponse 
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly isMaster: boolean,
        public readonly permissionIds: string[],
        public readonly accountIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
        
        
        
        
        public readonly permissions: PermissionResponse[],
        public readonly accounts: AccountResponse[],
        
    ) {}
}