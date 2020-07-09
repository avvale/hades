import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetTagsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}