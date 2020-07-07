import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetFlowsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}