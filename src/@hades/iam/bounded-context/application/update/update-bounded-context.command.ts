import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateBoundedContextCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name?: string,
            root?: string,
            sort?: number,
            isActive?: boolean,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}