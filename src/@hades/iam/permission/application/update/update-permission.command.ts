import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdatePermissionCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name?: string,
            boundedContextId?: string,
            roleIds?: string[],
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}