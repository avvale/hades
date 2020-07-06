import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindResourceQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}