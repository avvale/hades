export class InsertJobsDetailCommand 
{
    constructor(
        public readonly jobsDetail: {
            id: string,
            tenantId: string,
            systemId: string,
            systemName: string,
            executionId: string,
            executionType: string,
            executionExecutedAt: string,
            executionMonitoringStartAt: string,
            executionMonitoringEndAt: string,
            status: string,
            detail: string,
            example: string,
            
        } []
    ) {}
}