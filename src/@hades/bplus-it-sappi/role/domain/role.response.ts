export class RoleResponse 
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly name: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}