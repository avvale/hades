import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindPermissionQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}