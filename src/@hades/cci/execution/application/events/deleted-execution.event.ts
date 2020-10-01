export class DeletedExecutionEvent
{
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly systemId: string,
        public readonly systemName: string,
        public readonly version: string,
        public readonly type: string,
        public readonly executedAt: string,
        public readonly monitoringStartAt: string,
        public readonly monitoringEndAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}