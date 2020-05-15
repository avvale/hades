import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindLangQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}