import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetApplicationsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}