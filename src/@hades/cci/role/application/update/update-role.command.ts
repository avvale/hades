import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateRoleCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId?: string,
            tenantCode?: string,
            name?: string,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}