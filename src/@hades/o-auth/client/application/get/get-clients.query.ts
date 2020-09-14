import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetClientsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}