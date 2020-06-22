import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetTenantsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}