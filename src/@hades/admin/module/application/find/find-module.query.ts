import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindModuleQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}