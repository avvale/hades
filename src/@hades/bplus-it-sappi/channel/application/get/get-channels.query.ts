import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetChannelsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}