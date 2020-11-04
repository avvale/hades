import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateChannelDetailCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId?: string,
            tenantCode?: string,
            systemId?: string,
            systemName?: string,
            executionId?: string,
            executionType?: string,
            executionExecutedAt?: string,
            executionMonitoringStartAt?: string,
            executionMonitoringEndAt?: string,
            status?: string,
            channelHash?: string,
            channelSapId?: string,
            channelParty?: string,
            channelComponent?: string,
            channelName?: string,
            detail?: string,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}