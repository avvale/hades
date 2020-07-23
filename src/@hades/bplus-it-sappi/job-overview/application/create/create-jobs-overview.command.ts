export class CreateJobsOverviewCommand 
{
    constructor(
        public readonly jobsOverview: {
            id: string,
            tenantId: string,
            tenantCode: string,
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