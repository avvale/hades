import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindRefreshTokenQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}