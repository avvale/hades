import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindAccessTokenQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}