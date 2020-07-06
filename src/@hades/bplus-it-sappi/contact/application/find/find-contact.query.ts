import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindContactQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}