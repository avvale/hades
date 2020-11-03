import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { QueryMetadata } from '@hades/shared/domain/lib/hades.types';

export class FindExecutionByIdQuery
{
    constructor(
        public readonly id: string,
        public readonly constraint?: QueryStatement,
        public readonly queryMetadata?: QueryMetadata,
    ) {}
}