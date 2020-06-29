export class InsertJobsCommand 
{
    constructor(
        public readonly jobs: {
            id: string,
            tenantId: string,
            systemId: string,
            systemName: string,
            executionId: string,
            executionType: string,
            executionExecutedAt: string,
            executionMonitoringStartAt: string,
            executionMonitoringEndAt: string,
            cancelled?: number,
            completed?: number,
            error?: number,
            
        } []
    ) {}
}