import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { QueryMetadata } from '@hades/shared/domain/lib/hades.types';

export class GetExecutionsQuery
{
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly queryMetadata?: QueryMetadata,
    ) {}
}