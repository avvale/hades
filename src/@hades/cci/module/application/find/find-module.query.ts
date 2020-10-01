import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindModuleQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}