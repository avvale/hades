import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetContactsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}