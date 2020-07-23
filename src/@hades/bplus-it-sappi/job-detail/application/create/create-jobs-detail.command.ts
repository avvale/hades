export class CreateJobsDetailCommand 
{
    constructor(
        public readonly jobsDetail: {
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
            status: string,
            name?: string,
            returnCode?: number,
            node?: string,
            user?: string,
            startAt: string,
            endAt: string,
            
        } []
    ) {}
}