import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateChannelsOverviewCommand
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
            error?: number,
            inactive?: number,
            successful?: number,
            stopped?: number,
            unknown?: number,
            unregistered?: number,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}