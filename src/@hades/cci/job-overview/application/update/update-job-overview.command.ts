import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateJobOverviewCommand
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
            cancelled?: number,
            completed?: number,
            error?: number,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}