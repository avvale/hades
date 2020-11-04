import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateSystemCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId?: string,
            tenantCode?: string,
            version?: string,
            name?: string,
            environment?: string,
            technology?: string,
            isActive?: boolean,
            cancelledAt?: string,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}