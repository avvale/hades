import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateTenantCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name?: string,
            code?: string,
            logo?: string,
            isActive?: boolean,
            data?: any,
            accountIds?: string[],
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}