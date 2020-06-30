export class InsertJobsOverviewCommand 
{
    constructor(
        public readonly jobsOverview: {
            id: string,
            tenantId: string,
            systemId: string,
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