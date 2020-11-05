import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateApplicationCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name?: string,
            code?: string,
            secret?: string,
            isMaster?: boolean,
            clientIds?: string[],
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}