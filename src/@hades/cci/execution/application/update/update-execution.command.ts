import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateExecutionCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId?: string,
            tenantCode?: string,
            systemId?: string,
            systemName?: string,
            version?: string,
            type?: string,
            executedAt?: string,
            monitoringStartAt?: string,
            monitoringEndAt?: string,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}