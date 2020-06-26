import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindTenantQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}