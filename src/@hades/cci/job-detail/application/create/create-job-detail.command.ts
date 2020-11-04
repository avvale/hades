import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateJobDetailCommand
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
            status: string,
            name?: string,
            returnCode?: number,
            node?: string,
            user?: string,
            startAt: string,
            endAt: string,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}