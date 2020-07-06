import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetResourcesQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}