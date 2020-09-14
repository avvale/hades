import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteRefreshTokensCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}