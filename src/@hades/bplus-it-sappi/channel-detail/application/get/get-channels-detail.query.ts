import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetChannelsDetailQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}