import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateMessageOverviewCommand
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
            numberMax?: number,
            numberDays?: number,
            success?: number,
            cancelled?: number,
            delivering?: number,
            error?: number,
            holding?: number,
            toBeDelivered?: number,
            waiting?: number,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}