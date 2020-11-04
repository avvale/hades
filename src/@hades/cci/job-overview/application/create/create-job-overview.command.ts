import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateJobOverviewCommand
{
    constructor(
        public readonly payload: {
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
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}