import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateDataLakeCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId?: string,
            executionId?: string,
            tenantCode?: string,
            payload?: any,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}