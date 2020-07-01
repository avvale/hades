import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetPermissionsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}