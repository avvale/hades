import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetActionsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}