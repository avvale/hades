import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetLangsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}