import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetDataLakesQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}