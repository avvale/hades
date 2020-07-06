import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetModulesQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}