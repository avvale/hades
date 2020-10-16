import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindLangQuery
{
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
    ) {}
}