export class UpdatedSystemEvent
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly version: string,
        public readonly name: string,
        public readonly environment: string,
        public readonly isActive: boolean,
        public readonly cancelledAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}