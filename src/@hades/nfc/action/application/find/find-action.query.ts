import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindActionQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}