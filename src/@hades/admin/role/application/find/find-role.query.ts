import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindRoleQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}