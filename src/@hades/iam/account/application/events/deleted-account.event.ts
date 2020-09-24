export class DeletedAccountEvent
{
    constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly name: string,
        public readonly isActive: boolean,
        public readonly clientId: string,
        public readonly applicationCodes: any,
        public readonly permissions: any,
        public readonly data: any,
        public readonly roleIds: string[],
        public readonly tenantIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}