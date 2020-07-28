export class UpdatedDataLakeEvent
{
    constructor(
        public readonly id: string,
        public readonly executionId: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly payload: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}